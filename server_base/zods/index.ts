import {SCHEMA_TYPE} from "../../share/types/DataTypes";
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
import {zTaskInput, zTaskOutput, ZodTaskAPIs} from "./tasks/zTask";
import {zTaskCheckItemInput, zTaskCheckItemOutput, ZodTaskCheckItemAPIs} from "./tasks/zTaskCheckItem";
import {zPlmCodeInput, zPlmCodeOutput, ZodPlmCodeAPIs} from "./projects/zPlmCode";
import {zPlmDefectInput, zPlmDefectOutput, ZodPlmDefectAPIs} from "./projects/zPlmDefect";
import {zProjectInput, zProjectOutput, ZodProjectAPIs} from "./projects/zProject";
import {zTestProjectInput, zTestProjectOutput, ZodTestProjectAPIs} from "./projects/zTestProject";
import {zTtv2TestSuiteInput, zTtv2TestSuiteOutput, ZodTtv2TestSuiteAPIs} from "./projects/zTtv2TestSuite";
import {zTtv2TestSetInput, zTtv2TestSetOutput, ZodTtv2TestSetAPIs} from "./projects/zTtv2TestSet";
import {zTtv2TestcaseInput, zTtv2TestcaseOutput, ZodTtv2TestcaseAPIs} from "./projects/zTtv2Testcase";
import {zScopeInput, zScopeOutput, ZodScopeAPIs} from "./users/zScope";
import {zUserInput, zUserOutput, ZodUserAPIs} from "./users/zUser";
import {zUserScopeInput, zUserScopeOutput, ZodUserScopeAPIs} from "./users/zUserScope";

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