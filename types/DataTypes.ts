export enum BASIC_TYPE {
  DATE = "Date",
  DATE_RANGE = "DateRange",
  TIME = "Time",
  DATE_TIME="DateTime",
  DATE_TIME_RANGE="DateTimeRange",
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

export enum SCHEMA_TYPE {
  USER = "User" /* default, dont remove*/,
  SCOPE = "Scope" /* default, dont remove*/,
  USER_SCOPE = "User Group" /* default, dont remove*/,

  PROJECT = "Project",
  TEST_PROJECT = "Test Project",
  PLM_CODE = "PLM Code",
  PLM_DEFECT = "PLM Defect",
  TTV2_TEST_SUITE = "TTv2 Test suite",
  TTV2_TEST_SET = "TTv2 Test set",
  TTV2_TESTCASE = "TTv2 Testcase",

  TASK = "Task",
  TASK_CHECK_ITEM = "Task Check Item",

  ASSET = "Asset",
  ASSET_LOG = "Asset Log",
  ASSET_INVOICE="Asset Invoice",
  ASSET_INVOICE_LOG="Asset Invoice Log",
  ASSET_CATEGORY = "Asset Category",
  ASSET_CATEGORY_LOG = "Asset Category Log",
  ASSET_PIC = "Asset Pic",
  ASSET_PIC_LOG = "Asset Pic Log",
  ASSET_PROPERTY = "Asset Property",
  ASSET_PROPERTY_LOG = "Asset Property Log",
}

export type DataType =
  | BASIC_TYPE
  | SCHEMA_TYPE
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

export function getBaseType(
  type: DataType
): "SCHEMA_TYPE" | "BASIC_TYPE" | "FILE_TYPE" {
  const _type = Array.isArray(type) ? type[0] : type;
  if (Object.values(SCHEMA_TYPE).includes(_type as SCHEMA_TYPE))
    return "SCHEMA_TYPE";
  if (Object.values(FILE_TYPE).includes(_type as FILE_TYPE)) return "FILE_TYPE";
  return "BASIC_TYPE";
}

export function getSingleType<T extends BASIC_TYPE | SCHEMA_TYPE | FILE_TYPE>(
  type: DataType
): T {
  return (Array.isArray(type) ? type[0] : type) as T;
}

export const TTV2_STATES=["READY",
"SKIPPED",
"TESTING",
"PAUSE", // TODO cai nay doan vay :))
"TEST_NOK",
"TEST_OK",
"REVIEWING", //TODO cai nay la doan vay :)),chua check lai
"REVIEW_PAUSE", //TODO cai nay la doan vay :)),chua check lai
"REVIEW_NOK", //TODO cai nay la doan vay :)),chua check lai
"REVIEW_OK",
"TEST_SUITE_RUNNING",
"TEST_SUITE_STOPPED"]