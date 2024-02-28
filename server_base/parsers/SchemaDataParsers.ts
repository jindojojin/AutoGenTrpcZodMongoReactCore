import {ZodTypeAny} from "zod";
import {getSingleType} from "../../share/types/DataTypes";
import {ISchemaConfig} from "../../share/types/ISchemaConfig";

import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";
import {verifyWithZod, zObjectId} from "../zodUtils";
import {ObjectId} from "mongodb";

/**
 * 1) Thay thế giá trị các cột là REF tới 1 bảng khác = objectID (Thay search schema thông qua searchKey và thay bằng objectID)
 * 2) Chuẩn hoá các data dựa theo schemaconfig
 * 3) Verify data sử dụng zod
 * @param records
 * @param schemaConfig
 * @param InputSchema
 */
export async function getSchemaDataFromArray<T>(
  records: T[],
  schemaConfig: ISchemaConfig<T>,
  InputSchema: ZodTypeAny,
) {
  // console.log("Excel data", records);
  const verifiedRecords: T[] = [];
  const verifiedIndexs: number[] = [];
  const errorRecords: { idx: number; errors: any }[] = [];
  /** Step 1: Lấy ra tất cả các REF field (kiểu ObjectID)
   *
   */
  // const refFields = schemaConfig.relationKeys;
  const refFields = schemaConfig.relationKeys.reduce(
    (map, k) => {
      const keyType = getSingleType<SCHEMA_TYPE>(
        schemaConfig.fieldConfigs[k].type,
      );
      map.get(keyType as SCHEMA_TYPE)?.push(k);
      return map;
    },
    new Map<SCHEMA_TYPE, (keyof T)[]>(
      Object.values(SCHEMA_TYPE).map((s) => [s, []]),
    ),
  );
  console.log("Ref fields", refFields);
  /** Step 2: Lấy tất cả các bản ghi có thể có của mỗi REF,
   * vd: import 100 record nhưng chỉ link đến 50 user=> lấy ra danh sách 50 user theo import key của user
   * -> Xây dựng map RefList cho các REF. VD : {users: [List of searchKey of User], projects: [List of searchKey of Project]}
   */
  const RefList = new Map(
    Object.values(SCHEMA_TYPE).map((f) => [f, new Set()]),
  );
  records.forEach((row, idx) => {
    Array.from(refFields.keys()).forEach((schema) => {
      refFields.get(schema)?.forEach((f) => {
        if (Array.isArray(schemaConfig.fieldConfigs[f].type)) {
          String(row[f])
            .split(",")
            .forEach((v) => {
              if (v && !zObjectId().safeParse(v).success)
                // Nếu sẵn là objectID => bỏ qua
                RefList.get(schema)?.add(v);
            });
        } else if (row[f] && !zObjectId().safeParse(row[f]).success)
          RefList.get(schema)?.add(row[f]);
      });
    });
  });

  console.log("RefList", RefList);
  /** Step 3: Lấy tất cả các bản ghi theo danh sách RefList trong DB phục vụ cho việc mapping.
   *
   */
  const RefMap = new Map(
    Object.values(SCHEMA_TYPE).map((f) => [
      f,
      new Map<T[keyof T], T[keyof T]>(),
    ]),
  );
  await Promise.all(
    Array.from(refFields.keys()).map((schemaType) => {
      return (async () => {
        const Model = DATABASE_MODELS[schemaType];
        const RefSchemaConfig = SCHEMAS_CONFIG[
          schemaType as keyof typeof SCHEMAS_CONFIG
        ] as ISchemaConfig<any>;
        const uniqueKeys = ["_id", ...RefSchemaConfig.uniqueKeys];
        const list = uniqueKeys.length
          ? await Model.find(
              {
                $or: uniqueKeys.map((key) => ({
                  [key]: {
                    $in: Array.from(RefList.get(schemaType)?.values() ?? []),
                  },
                })),
              },
              {
                ...uniqueKeys.reduce((obj, key) => {
                  return {
                    ...obj,
                    [key]: 1,
                  };
                }, {}),
                _id: 1,
              },
            )
          : [];
        console.log(`List ${schemaType} ref in DB`, list);
        list.forEach((record: any) => {
          uniqueKeys.forEach((key) => {
            if (record[key])
              RefMap.get(schemaType)?.set(record[key], record._id);
          });
        });
      })();
    }),
  );
  console.log("RefMap:", RefMap);
  /** Step 4: Mapping lại các REF (uniqueKey -> _id ) và Verify bằng Zod
   *
   */
  records.forEach((raw, idx) => {
    const modifyData: Partial<T> = {};
    Array.from(refFields.keys()).forEach((schema) => {
      refFields.get(schema)?.forEach((refField) => {
        if (raw[refField]) {
          if (Array.isArray(schemaConfig.fieldConfigs[refField].type))
            modifyData[refField] = String(raw[refField])
              .split(",")
              .map(
                (k) =>
                  RefMap.get(schema)?.get(k.trim() as any) ??
                  (safeParseObjectID(k.trim()) as any),
              ) as any;
          else
            modifyData[refField] =
              RefMap.get(schema)?.get(raw[refField]) ??
              (safeParseObjectID(raw[refField]) as any);
        }
      });
    });
    const data = {
      ...raw,
      ...modifyData,
    };
    console.log("data trước khi parse", data);
    //@ts-ignore
    delete data["UNDEFINED"];
    const parseResult = verifyWithZod(InputSchema, data);
    if (parseResult.success) {
      verifiedRecords.push(parseResult.data as any);
      verifiedIndexs.push(idx);
    } else {
      errorRecords.push({
        idx,
        errors: parseResult.errors.map((error) => ({
          ...error,
          path:
            schemaConfig.fieldConfigs[
              error.path as keyof typeof schemaConfig.fieldConfigs
            ]?.label ?? error.path,
        })),
      });
    }
  });
  const result = {
    verifiedRecords,
    verifiedIndexs,
    errorRecords,
  };
  if (errorRecords.length)
    console.log("Parse Schema with errors:", errorRecords);
  return result;
}

function safeParseObjectID(id: any) {
  if (id && zObjectId().safeParse(id).success) return new ObjectId(id);
  else return null;
}