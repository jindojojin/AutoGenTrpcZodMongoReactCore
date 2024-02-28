import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {VIEW_TYPE} from "../../views/ViewTypes";
import {TABLE_API} from "../../custom_apis/TableAPI";

export enum BASIC_TYPE {
  DATE = "Date",
  DATE_RANGE = "DateRange",
  TIME = "Time",
  DATE_TIME = "DateTime",
  DATE_TIME_RANGE = "DateTimeRange",
  TEXT = "String",
  NUMBER = "Number",
  ENUM = "Enum",
  BOOLEAN = "Boolean",
  UNKNOWN = "Unknown",
}

export enum FILE_TYPE {
  FILE = "File",
  IMAGE = "Image",
  VIDEO = "Video",
  AUDIO = "Audio",
}

export type DataType =
    | BASIC_TYPE
    | SCHEMA_TYPE
    | VIEW_TYPE
    | TABLE_API
    | FILE_TYPE
    | BASIC_TYPE[]
    | SCHEMA_TYPE[]
    | FILE_TYPE[];

export function isBasicType(type: any) {
  const _type = Array.isArray(type) ? type[0] : type;
  return Object.values(BASIC_TYPE).includes(_type as BASIC_TYPE);
}

export function isFileType(type: any) {
  const _type = Array.isArray(type) ? type[0] : type;
  return Object.values(FILE_TYPE).includes(_type as FILE_TYPE);
}

export function isSchemaType(type: any) {
  const _type = Array.isArray(type) ? type[0] : type;
  return Object.values(SCHEMA_TYPE).includes(_type as SCHEMA_TYPE);
}

export function isTableAPIType(type:any){
  const _type = Array.isArray(type) ? type[0] : type;
  return Object.values(TABLE_API).includes(_type as TABLE_API);
}

export function getBaseType(
    type: DataType
): "SCHEMA_TYPE" | "BASIC_TYPE" | "FILE_TYPE" | "VIEW_TYPE" | "TABLE_API" {
  const _type = Array.isArray(type) ? type[0] : type;

  if (type == "Test project members view") console.log(Object.keys(SCHEMA_TYPE), Object.values(SCHEMA_TYPE))
  if (Object.values(SCHEMA_TYPE).includes(_type as SCHEMA_TYPE))
    return "SCHEMA_TYPE";
  if (Object.values(VIEW_TYPE).includes(_type as VIEW_TYPE))
    return "VIEW_TYPE";
  if (Object.values(TABLE_API).includes(_type as TABLE_API))
    return "TABLE_API";
  if (Object.values(FILE_TYPE).includes(_type as FILE_TYPE)) return "FILE_TYPE";
  return "BASIC_TYPE";
}

export function getSingleType<T extends BASIC_TYPE | SCHEMA_TYPE | FILE_TYPE>(
    type: DataType
): T {
  return (Array.isArray(type) ? type[0] : type) as T;
}
