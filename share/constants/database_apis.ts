import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
export type API_NAME = "assetLog"|"asset"|"assetCategoryLog"|"assetCategory"|"assetPropertyLog"|"assetProperty"|"assetPicLog"|"assetPic"|"assetInvoiceLog"|"assetInvoice"|"task"|"taskCheckItem"|"plmCode"|"plmDefect"|"project"|"testProject"|"ttv2TestSuite"|"ttv2TestSet"|"ttv2Testcase"|"scope"|"user"|"userScope"
export const DATABASE_APIS: Record<SCHEMA_TYPE, API_NAME> = {
  [SCHEMA_TYPE.ASSET_LOG]: "assetLog",
  [SCHEMA_TYPE.ASSET]: "asset",
  [SCHEMA_TYPE.ASSET_CATEGORY_LOG]: "assetCategoryLog",
  [SCHEMA_TYPE.ASSET_CATEGORY]: "assetCategory",
  [SCHEMA_TYPE.ASSET_PROPERTY_LOG]: "assetPropertyLog",
  [SCHEMA_TYPE.ASSET_PROPERTY]: "assetProperty",
  [SCHEMA_TYPE.ASSET_PIC_LOG]: "assetPicLog",
  [SCHEMA_TYPE.ASSET_PIC]: "assetPic",
  [SCHEMA_TYPE.ASSET_INVOICE_LOG]: "assetInvoiceLog",
  [SCHEMA_TYPE.ASSET_INVOICE]: "assetInvoice",
  [SCHEMA_TYPE.TASK]: "task",
  [SCHEMA_TYPE.TASK_CHECK_ITEM]: "taskCheckItem",
  [SCHEMA_TYPE.PLM_CODE]: "plmCode",
  [SCHEMA_TYPE.PLM_DEFECT]: "plmDefect",
  [SCHEMA_TYPE.PROJECT]: "project",
  [SCHEMA_TYPE.TEST_PROJECT]: "testProject",
  [SCHEMA_TYPE.TTV2_TEST_SUITE]: "ttv2TestSuite",
  [SCHEMA_TYPE.TTV2_TEST_SET]: "ttv2TestSet",
  [SCHEMA_TYPE.TTV2_TESTCASE]: "ttv2Testcase",
  [SCHEMA_TYPE.SCOPE]: "scope",
  [SCHEMA_TYPE.USER]: "user",
  [SCHEMA_TYPE.USER_SCOPE]: "userScope"
};