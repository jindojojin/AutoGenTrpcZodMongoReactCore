import { DynamicConfig, ISchemaConfig } from "../../share/types/ISchemaConfig";
import _ from "lodash";
import { getSingleType } from "../../share/types/DataTypes";
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { SCHEMAS_CONFIG } from "../../share/schema_configs";
import { ZodTypeAny } from "zod";
import { DATABASE_MODELS } from "../mongoose/DatabaseModels";
import { $joinTable, $manyToOneJoin } from "../database-functions/Utils";
import { DYNAMIC_CATEGORY_ID } from "../../share/constants/database_fields";
import { verifyWithZod, zObjectId } from "../zodUtils";
import { ObjectId } from "mongodb";
import { ISchemaFieldConfig } from "../../share/types/ISchemaDefinition";
import {
  getCategoryKeyOfDynamicData,
  isDynamicSchemaType,
} from "../../share/SchemaUtils";

type DynamicValue = {
  value: any;
  category: string;
};

function safeParseObjectID(id: any) {
  if (id && zObjectId().safeParse(id).success) return new ObjectId(id);
  else return null;
}

function safeMapping(data: any, Map?: Map<any, any>) {
  if (Array.isArray(data)) {
    return data.map((item) => Map?.get(item));
  } else {
    return Map?.get(data);
  }
}

function getUniqueRefValues<T>(
    records: T[],
    staticKeys: (keyof T)[],
    dynamicKeys: (keyof T)[],
    SchemaConfig: ISchemaConfig<T>,
) {
  const StaticRefValues = new Map(staticKeys.map((k) => [k, new Set()]));
  const DynamicRefValues = new Map(dynamicKeys.map((k) => [k, new Set()]));
  records.forEach((data) => {
    staticKeys.forEach((k) => {
      if (data[k]) StaticRefValues.get(k)?.add(data[k]);
    });
    dynamicKeys.forEach((field) => {
      const categoryField = getCategoryKeyOfDynamicData(field);
      if (data[field] && data[categoryField])
        DynamicRefValues.get(field)?.add(
            JSON.stringify({
              value: data[field],
              category: data[categoryField],
            } as DynamicValue),
        );
    });
  });
  return { StaticRefValues, DynamicRefValues };
}

export async function getSchemaDataFromArray<T>(
    records: T[],
    SchemaConfig: ISchemaConfig<T>,
    InputSchema: ZodTypeAny,
) {
  const [dynamicKeys, staticKeys] = _.partition(
      SchemaConfig.relationKeys,
      (key) => isDynamicSchemaType(SchemaConfig.fieldConfigs[key].type),
  );

  console.log("Dynamic Keys:", dynamicKeys);
  console.log("Static Keys:", staticKeys);
  /** Step 0: Với mỗi relationKey, lấy ra tất cả các giá trị có thể có (gọi là RefValues).
   * Riêng với relationKey link đến dynamic schema
   * lấy ra giá trị JSON.stringify({categoryName, uniqueValue})
   */
  const { DynamicRefValues, StaticRefValues } = getUniqueRefValues(
      records,
      staticKeys,
      dynamicKeys,
      SchemaConfig,
  );

  console.log("Static REf", StaticRefValues);

  /** Step 1A: Đối với dynamicKey: tạo Mapping JSON.stringify({categoryName, uniqueValue}) => _id */
  const DynamicRefMap = await getDynamicRefMap(
      SchemaConfig,
      dynamicKeys,
      DynamicRefValues,
  );

  /** Step 1B: Đối với staticKey: tạo Mapping uniqueValue => _id  */
  const StaticRefMap = await getStaticRefMap(
      SchemaConfig,
      staticKeys,
      StaticRefValues,
  );

  console.log("Static ref map", StaticRefMap);

  /** Step 2: Mapping RefValue => ObjectID   */
  const verifiedRecords: T[] = [];
  const verifiedIndexes: number[] = [];
  const errorRecords: { idx: number; errors: any }[] = [];
  records.forEach((data, idx) => {
    //2A: Mapping
    staticKeys.forEach((k) => {
      data[k] =
          safeMapping(data[k], StaticRefMap.get(k)) ?? safeParseObjectID(data[k]);
    });
    dynamicKeys.forEach((k) => {
      const categoryKey = getCategoryKeyOfDynamicData(k);
      const mapKey = JSON.stringify({
        value: data[k],
        category: data[categoryKey],
      });
      data[k] =
          safeMapping(mapKey, DynamicRefMap.get(k)) ?? safeParseObjectID(data[k]);
    });
    //2B: Verify with Zod
    console.log("Data before parse zod", data);
    const parseResult = verifyWithZod(InputSchema, data);
    if (parseResult.success) {
      verifiedRecords.push(parseResult.data as any);
      verifiedIndexes.push(idx);
    } else {
      console.log("Raw zod errors", parseResult);
      errorRecords.push({
        idx,
        errors: parseResult.errors.map((error) => ({
          ...error,
          path:
              SchemaConfig.fieldConfigs[
                  error.path as keyof typeof SchemaConfig.fieldConfigs
                  ]?.label ?? error.path,
        })),
      });
    }
  });
  const result = {
    verifiedRecords,
    verifiedIndexs: verifiedIndexes,
    errorRecords,
  };
  if (errorRecords.length)
    console.log("Parse Schema with errors:", errorRecords);
  return result;
}

export async function getAllUniqueKeysByCategory(config: DynamicConfig) {
  const categoryInfos = await DATABASE_MODELS[config.category].aggregate([
    $joinTable("_id", config.property, "properties", DYNAMIC_CATEGORY_ID),
  ]);
  const result: Record<string, string[]> = categoryInfos.reduce(
      (acc:any, catInfo:any) => ({
        ...acc,
        [catInfo[DYNAMIC_CATEGORY_ID]]: catInfo["properties"]
        .filter((p: ISchemaFieldConfig) => p.unique)
        .map((p: any) => String(p._id)),
      }),
      {} as Record<string, string[]>
  );
  console.log("uniqueKey of Dynamic categories:", result);
  return result;
}

async function getDynamicRefMap<T>(
    SchemaConfig: ISchemaConfig<T>,
    dynamicKeys: (keyof T)[],
    DynamicRefValues: Map<keyof T, Set<any>>,
) {
  const RefMap = new Map(dynamicKeys.map((k) => [k, new Map()]));
  for (let i = 0; i < dynamicKeys.length; i++) {
    const refKey = dynamicKeys[i];
    const possibleValueSet = DynamicRefValues.get(refKey);
    if (!possibleValueSet) continue;
    const rawPossibleValues = Array.from(possibleValueSet.values());
    if(!rawPossibleValues.length) continue;
    const possibleValues = rawPossibleValues.map((v) =>
        JSON.parse(v),
    ) as DynamicValue[];
    const refSchemaType = getSingleType<SCHEMA_TYPE>(
        SchemaConfig.fieldConfigs[refKey].type,
    );
    const dynamicConfig = SCHEMAS_CONFIG[refSchemaType].dynamic as any; // chắc chắn có
    const UNIQUE_KEYS = await getAllUniqueKeysByCategory(dynamicConfig);
    //Build query dựa vào các giá trị có + Schema config
    const candidates = await DATABASE_MODELS[refSchemaType].aggregate(
        _.compact([
          ...$manyToOneJoin(DYNAMIC_CATEGORY_ID, dynamicConfig.category),
          {
            $set: {
              [DYNAMIC_CATEGORY_ID]: `$${DYNAMIC_CATEGORY_ID}.${DYNAMIC_CATEGORY_ID}`,
            },
          },
          {
            $match: {
              $or: possibleValues.map((v) => ({
                $and: [
                  { [DYNAMIC_CATEGORY_ID]: v.category },
                  {
                    $or: UNIQUE_KEYS[v.category].map((key) => ({
                      [key]: v.value,
                    })),
                  },
                ],
              })),
            },
          },
        ]),
    );

    console.log("Candidates", candidates);

    candidates.forEach((can: any) => {
      console.log(
          "Unique key of",
          can,
          ":======",
          UNIQUE_KEYS[can[DYNAMIC_CATEGORY_ID]],
      );
      UNIQUE_KEYS[can[DYNAMIC_CATEGORY_ID]].forEach((key) => {
        console.log("Raw possible", rawPossibleValues);
        if (can[key]) {
          const mapKey = JSON.stringify({
            value: can[key],
            category: can[DYNAMIC_CATEGORY_ID],
          });
          console.log("map key", mapKey);

          if (rawPossibleValues.includes(mapKey)) {
            console.log("Pass");
            RefMap.get(refKey)?.set(mapKey, can._id);
          }
        }
      });
    });
  }
  console.log("Dynamic RefMap", RefMap);
  return RefMap;
}

async function getStaticRefMap<T>(
    SchemaConfig: ISchemaConfig<T>,
    staticKeys: (keyof T)[],
    StaticRefValues: Map<keyof T, Set<any>>,
) {
  const RefMap = new Map(staticKeys.map((k) => [k, new Map()]));
  for (let i = 0; i < staticKeys.length; i++) {
    const refKey = staticKeys[i];
    const possibleValueSet = StaticRefValues.get(refKey);
    if (!possibleValueSet) continue;
    const possibleValues = Array.from(possibleValueSet.values());
    if (!possibleValues.length) continue;
    const refSchemaType = getSingleType<SCHEMA_TYPE>(
        SchemaConfig.fieldConfigs[refKey].type,
    );
    //Build query dựa vào các giá trị có + Schema config
    const UNIQUE_KEYS = SCHEMAS_CONFIG[refSchemaType].uniqueKeys;
    if(!UNIQUE_KEYS.length) continue;
    console.log("Unique keys", UNIQUE_KEYS);
    const candidates = await DATABASE_MODELS[refSchemaType].aggregate([
      {
        $match: {
          $or: UNIQUE_KEYS.map((uKey) => ({
            [uKey]: { $in: possibleValues },
          })),
        },
      },
      {
        $project: UNIQUE_KEYS.reduce((obj, key) => ({ ...obj, [key]: 1 }), {}),
      },
    ]);

    candidates.forEach((can: any) => {
      UNIQUE_KEYS.forEach((key) => {
        if (can[key] && possibleValues.includes(can[key]))
          RefMap.get(refKey)?.set(can[key], can._id);
      });
    });
  }
  console.log("Static RefMap", RefMap);
  return RefMap;
}