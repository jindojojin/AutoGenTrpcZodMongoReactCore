import {zAssetLogInput, zAssetLogOutput, ZodAssetLogAPIs} from "./assets/zAssetLog";
import {zAssetInput, zAssetOutput, ZodAssetAPIs} from "./assets/zAsset";
import {zAssetCategoryLogInput, zAssetCategoryLogOutput, ZodAssetCategoryLogAPIs} from "./assets/zAssetCategoryLog";
import {zAssetCategoryInput, zAssetCategoryOutput, ZodAssetCategoryAPIs} from "./assets/zAssetCategory";
import {zAssetPropertyLogInput, zAssetPropertyLogOutput, ZodAssetPropertyLogAPIs} from "./assets/zAssetPropertyLog";
import {zAssetPropertyInput, zAssetPropertyOutput, ZodAssetPropertyAPIs} from "./assets/zAssetProperty";
import {zAssetPicLogInput, zAssetPicLogOutput, ZodAssetPicLogAPIs} from "./assets/zAssetPicLog";
import {zAssetPicInput, zAssetPicOutput, ZodAssetPicAPIs} from "./assets/zAssetPic";
import {zAssetInvoiceLogInput, zAssetInvoiceLogOutput, ZodAssetInvoiceLogAPIs} from "./assets/zAssetInvoiceLog";
import {zAssetInvoiceInput, zAssetInvoiceOutput, ZodAssetInvoiceAPIs} from "./assets/zAssetInvoice";
import {ZodTaskAPIs, zTaskInput, zTaskOutput} from "./tasks/zTask";
import {ZodTaskCheckItemAPIs, zTaskCheckItemInput, zTaskCheckItemOutput} from "./tasks/zTaskCheckItem";
import {ZodPlmCodeAPIs, zPlmCodeInput, zPlmCodeOutput} from "./projects/zPlmCode";
import {ZodPlmDefectAPIs, zPlmDefectInput, zPlmDefectOutput} from "./projects/zPlmDefect";
import {ZodProjectAPIs, zProjectInput, zProjectOutput} from "./projects/zProject";
import {ZodTestProjectAPIs, zTestProjectInput, zTestProjectOutput} from "./projects/zTestProject";
import {ZodTtv2TestSuiteAPIs, zTtv2TestSuiteInput, zTtv2TestSuiteOutput} from "./projects/zTtv2TestSuite";
import {ZodTtv2TestSetAPIs, zTtv2TestSetInput, zTtv2TestSetOutput} from "./projects/zTtv2TestSet";
import {ZodTtv2TestcaseAPIs, zTtv2TestcaseInput, zTtv2TestcaseOutput} from "./projects/zTtv2Testcase";
import {ZodScopeAPIs, zScopeInput, zScopeOutput} from "./users/zScope";
import {ZodUserAPIs, zUserInput, zUserOutput} from "./users/zUser";
import {ZodUserScopeAPIs, zUserScopeInput, zUserScopeOutput} from "./users/zUserScope";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

export const ZOD_INPUTS = {
  [SCHEMA_TYPE.ASSET_LOG]: zAssetLogInput,
[SCHEMA_TYPE.ASSET]: zAssetInput,
[SCHEMA_TYPE.ASSET_CATEGORY_LOG]: zAssetCategoryLogInput,
[SCHEMA_TYPE.ASSET_CATEGORY]: zAssetCategoryInput,
[SCHEMA_TYPE.ASSET_PROPERTY_LOG]: zAssetPropertyLogInput,
[SCHEMA_TYPE.ASSET_PROPERTY]: zAssetPropertyInput,
[SCHEMA_TYPE.ASSET_PIC_LOG]: zAssetPicLogInput,
[SCHEMA_TYPE.ASSET_PIC]: zAssetPicInput,
[SCHEMA_TYPE.ASSET_INVOICE_LOG]: zAssetInvoiceLogInput,
[SCHEMA_TYPE.ASSET_INVOICE]: zAssetInvoiceInput,
[SCHEMA_TYPE.TASK]: zTaskInput,
[SCHEMA_TYPE.TASK_CHECK_ITEM]: zTaskCheckItemInput,
[SCHEMA_TYPE.PLM_CODE]: zPlmCodeInput,
[SCHEMA_TYPE.PLM_DEFECT]: zPlmDefectInput,
[SCHEMA_TYPE.PROJECT]: zProjectInput,
[SCHEMA_TYPE.TEST_PROJECT]: zTestProjectInput,
[SCHEMA_TYPE.TTV2_TEST_SUITE]: zTtv2TestSuiteInput,
[SCHEMA_TYPE.TTV2_TEST_SET]: zTtv2TestSetInput,
[SCHEMA_TYPE.TTV2_TESTCASE]: zTtv2TestcaseInput,
[SCHEMA_TYPE.SCOPE]: zScopeInput,
[SCHEMA_TYPE.USER]: zUserInput,
[SCHEMA_TYPE.USER_SCOPE]: zUserScopeInput
};

export const ZOD_OUTPUTS = {
  [SCHEMA_TYPE.ASSET_LOG]: zAssetLogOutput,
[SCHEMA_TYPE.ASSET]: zAssetOutput,
[SCHEMA_TYPE.ASSET_CATEGORY_LOG]: zAssetCategoryLogOutput,
[SCHEMA_TYPE.ASSET_CATEGORY]: zAssetCategoryOutput,
[SCHEMA_TYPE.ASSET_PROPERTY_LOG]: zAssetPropertyLogOutput,
[SCHEMA_TYPE.ASSET_PROPERTY]: zAssetPropertyOutput,
[SCHEMA_TYPE.ASSET_PIC_LOG]: zAssetPicLogOutput,
[SCHEMA_TYPE.ASSET_PIC]: zAssetPicOutput,
[SCHEMA_TYPE.ASSET_INVOICE_LOG]: zAssetInvoiceLogOutput,
[SCHEMA_TYPE.ASSET_INVOICE]: zAssetInvoiceOutput,
[SCHEMA_TYPE.TASK]: zTaskOutput,
[SCHEMA_TYPE.TASK_CHECK_ITEM]: zTaskCheckItemOutput,
[SCHEMA_TYPE.PLM_CODE]: zPlmCodeOutput,
[SCHEMA_TYPE.PLM_DEFECT]: zPlmDefectOutput,
[SCHEMA_TYPE.PROJECT]: zProjectOutput,
[SCHEMA_TYPE.TEST_PROJECT]: zTestProjectOutput,
[SCHEMA_TYPE.TTV2_TEST_SUITE]: zTtv2TestSuiteOutput,
[SCHEMA_TYPE.TTV2_TEST_SET]: zTtv2TestSetOutput,
[SCHEMA_TYPE.TTV2_TESTCASE]: zTtv2TestcaseOutput,
[SCHEMA_TYPE.SCOPE]: zScopeOutput,
[SCHEMA_TYPE.USER]: zUserOutput,
[SCHEMA_TYPE.USER_SCOPE]: zUserScopeOutput
};

export const ZOD_APIS = {
  [SCHEMA_TYPE.ASSET_LOG]: ZodAssetLogAPIs,
[SCHEMA_TYPE.ASSET]: ZodAssetAPIs,
[SCHEMA_TYPE.ASSET_CATEGORY_LOG]: ZodAssetCategoryLogAPIs,
[SCHEMA_TYPE.ASSET_CATEGORY]: ZodAssetCategoryAPIs,
[SCHEMA_TYPE.ASSET_PROPERTY_LOG]: ZodAssetPropertyLogAPIs,
[SCHEMA_TYPE.ASSET_PROPERTY]: ZodAssetPropertyAPIs,
[SCHEMA_TYPE.ASSET_PIC_LOG]: ZodAssetPicLogAPIs,
[SCHEMA_TYPE.ASSET_PIC]: ZodAssetPicAPIs,
[SCHEMA_TYPE.ASSET_INVOICE_LOG]: ZodAssetInvoiceLogAPIs,
[SCHEMA_TYPE.ASSET_INVOICE]: ZodAssetInvoiceAPIs,
[SCHEMA_TYPE.TASK]: ZodTaskAPIs,
[SCHEMA_TYPE.TASK_CHECK_ITEM]: ZodTaskCheckItemAPIs,
[SCHEMA_TYPE.PLM_CODE]: ZodPlmCodeAPIs,
[SCHEMA_TYPE.PLM_DEFECT]: ZodPlmDefectAPIs,
[SCHEMA_TYPE.PROJECT]: ZodProjectAPIs,
[SCHEMA_TYPE.TEST_PROJECT]: ZodTestProjectAPIs,
[SCHEMA_TYPE.TTV2_TEST_SUITE]: ZodTtv2TestSuiteAPIs,
[SCHEMA_TYPE.TTV2_TEST_SET]: ZodTtv2TestSetAPIs,
[SCHEMA_TYPE.TTV2_TESTCASE]: ZodTtv2TestcaseAPIs,
[SCHEMA_TYPE.SCOPE]: ZodScopeAPIs,
[SCHEMA_TYPE.USER]: ZodUserAPIs,
[SCHEMA_TYPE.USER_SCOPE]: ZodUserScopeAPIs
}