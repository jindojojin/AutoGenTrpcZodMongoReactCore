import { capitalCase } from "change-case";
import dayjs from "dayjs";
import * as ExcelJS from "exceljs";
import _ from "lodash";
import { parse as CSVParser } from "papaparse";
import {
  getFieldsMapByTitle,
  getLinkedSchemaConfig,
} from "../../share/SchemaUtils";
import {
  BASIC_TYPE,
  DataType,
  isBasicType,
} from "../../share/types/DataTypes";
import { ISchemaConfig } from "../../share/types/ISchemaConfig";

import { getObjectKeys } from "../../share/CommonFunctions";

function getDate(s?: any) {
  const date = new Date(s);
  return !date.toString().toLowerCase().includes("invalid") ? date : undefined;
}

export function getTypedData(
  data: any,
  type: DataType,
  enums: string[] = [],
  arrayDelimiter: string = ",",
): any {
  if (!data) return undefined;
  if (Array.isArray(type)) {
    return _.compact(
      String(data)
        .split(arrayDelimiter)
        .map((d) => getTypedData(d, type[0], enums, arrayDelimiter)),
    );
  } else {
    const str = String(data).trim();
    if (!str.length) return undefined; // Không điền gì = undefined
    switch (type) {
      case BASIC_TYPE.DATE:
        return getDate(str);
      case BASIC_TYPE.TIME:
        return getDate(str);
      case BASIC_TYPE.NUMBER:
        return Number.isNaN(Number(str)) ? undefined : Number(str);
      case BASIC_TYPE.ENUM:
        return Number.isNaN(data) ? str : enums[data];
      case BASIC_TYPE.BOOLEAN:
        return ["true", "yes", "v", "y"].includes(str.toLowerCase());
      default:
        return data;
    }
  }
}

export function getTypedString(
  data: any,
  type: DataType,
  arrayDelimiter: string = ",",
): string {
  if (Array.isArray(type)) {
    return _.compact(data)
      .map((d) => getTypedString(d, type[0]))
      .join(arrayDelimiter);
  } else {
    if (isBasicType(type))
      switch (type) {
        case BASIC_TYPE.DATE:
          return dayjs(data).format("MM/DD/YYYY");
        case BASIC_TYPE.TIME:
          return dayjs(data).format("hh:mm");
        case BASIC_TYPE.NUMBER:
          return String(data);
        case BASIC_TYPE.BOOLEAN:
          return data ? "true" : "false";
        case BASIC_TYPE.TEXT:
        case BASIC_TYPE.ENUM:
          return data ?? "";
        default:
          return data ? JSON.stringify(data) : ""; // undefined = ""
      }
    else {
      return data._id ?? "";
    }
  }
}

export async function getListDataFromExcelTable<T>(filePath: string) {
  try {
    console.log(`Read excel file at path ${filePath}`);
    const workbook = new ExcelJS.Workbook();
    const worksheet = await workbook.xlsx.readFile(filePath);
    // Lấy dữ liệu từ sheet đầu tiên
    const sheet = worksheet.worksheets[0];
    return sheet.getSheetValues();
  } catch (e) {
    console.error("Error when trying to read excel ", e);
    throw e;
  }
}

export async function getListDataFromTextTable<T>(content: string) {
  try {
    const data = CSVParser(content, {
      comments: "#",
      skipEmptyLines: "greedy",
      transformHeader: (header) => header.trim().toLowerCase(),
    });
    return data.data;
  } catch (e) {
    console.error("Error when trying to read data ", e);
    throw e;
  }
}

/**
 * Chuẩn hoá dữ liệu thô sử dụng schemaConfig
 * @param listData
 * @param schemaConfig
 * @param initData
 */
export function getTypedDataFromListData<T>(
  listData: any[],
  schemaConfig?: ISchemaConfig<T>,
  initData?: Partial<T>,
) {
  let headersInFile: any[] | undefined = undefined;
  let headersMap = getFieldsMapByTitle(schemaConfig, (t) => t.toLowerCase()); // Không biệt in hoa, in thường
  console.log("Header map", headersMap);
  initData = initData? _.mapValues(initData, (v, k) =>
  schemaConfig?.fieldConfigs?.[k as keyof T]
      ? getTypedData(
          v,
          schemaConfig.fieldConfigs[k as keyof T].type,
          schemaConfig.fieldConfigs[k as keyof T].enum
        )
      : v
  ) :{}
  console.log("Init data", initData)
  
  const result = listData.reduce((arr, currentRow, currentRowIdx) => {
    if (currentRow != null) {
      // exceljs đọc hàng 0 -> bị undefined với file excel
      const standardized_row = _(currentRow)
        .map((cell: any) => (typeof cell === "string" ? cell.trim() : cell))
        .value();
      if (_.compact(standardized_row).length > 0) {
        // bỏ qua những hàng trống hoàn toàn
        if (!headersInFile)
          headersInFile = standardized_row.map((t) => String(t).toLowerCase());
        else {
          const record = headersInFile.reduce(
            (obj, colName, colIdx) => {
              if (!colName) return obj;
              let data = standardized_row[colIdx];
              const key = (headersMap?.[colName] ?? colName) as keyof T;
              if (schemaConfig) {
                if (!getObjectKeys(headersMap).includes(colName)) return obj;
                data = getTypedData(
                  data,
                  schemaConfig.fieldConfigs[key].type,
                  schemaConfig.fieldConfigs[key]?.enum,
                );
              }
              return {
                ...obj,
                [key]: data,
              };
            },
           initData
          );
          return [...(arr as any), record];
        }
      }
    }
    return [...(arr as any)];
  }, []);
  return result as unknown as T[];
}

/**
 * Chuyển list dữ liệu thành data dạng bảng (headers row + data rows)
 * @param listData
 * @param schemaConfig
 */
export function getTableFromListData<T extends { [key: string]: any }>(
  listData: T[],
  schemaConfig: ISchemaConfig<T>,
) {
  /**
   * Step1: Xây dựng header và đường đẫn đến data
   */
  const fieldConfigs = schemaConfig.fieldConfigs;
  const schemaHeaders = getObjectKeys(fieldConfigs)
    .filter((k) => !fieldConfigs[k]?.hidden)
    .sort(
      (a, b) =>
        (fieldConfigs[a].orderIdx ?? 0) - (fieldConfigs[b].orderIdx ?? 0),
    );
  const tableHeadersLabel: string[] = [];
  const tableHeadersKey: string[][] = [];
  const tableHeadersType: DataType[] = [];
  schemaHeaders.forEach((field) => {
    const linkedSchema = getLinkedSchemaConfig<any>(fieldConfigs[field]);
    const defaultLabel =
      fieldConfigs[field].label ?? capitalCase(String(field));
    if (linkedSchema) {
      // Nếu trong các exportKey có truờng unique -> chọn làm key đại diện (Có thể dùng để import lại), nếu không có ->dùng _id
      const representKey =
        _.intersection(linkedSchema.uniqueKeys, linkedSchema.exportKeys)[0] ??
        "_id";
      tableHeadersKey.push([String(field), String(representKey)]);
      tableHeadersLabel.push(defaultLabel);
      tableHeadersType.push(linkedSchema.fieldConfigs[representKey].type);
      // Thêm các trường export khác.
      linkedSchema.exportKeys
        .filter((k) => k != representKey)
        .forEach((exportKey) => {
          tableHeadersKey.push([String(field), String(exportKey)]);
          tableHeadersLabel.push(
            `${defaultLabel} (${linkedSchema.fieldConfigs[exportKey].label})`,
          );
          tableHeadersType.push(linkedSchema.fieldConfigs[exportKey].type);
        });
    } else {
      tableHeadersKey.push([String(field)]);
      tableHeadersLabel.push(defaultLabel);
      tableHeadersType.push(fieldConfigs[field].type);
    }
  });
  /**
   * Step 2: Thêm các hàng vào bảng
   */
  const result = [tableHeadersLabel];
  listData.forEach((data) => {
    const row = tableHeadersKey.reduce((acc: string[], keys: string[], idx) => {
      let value = data;
      keys.forEach((k) => {
        value = Array.isArray(value) ? value.map((v) => v?.[k]) : value?.[k];
      });
      return [...acc, getTypedString(value, tableHeadersType[idx])];
    }, [] as string[]);
    result.push(row);
  });
  return result;
}
