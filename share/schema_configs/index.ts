import {ISchemaConfig} from "../types/ISchemaConfig";
import {SCHEMA_TYPE} from "../types/DataTypes";
import {AssetLogSchemaConfig} from "./assets/AssetLogSchemaConfig";
import {AssetSchemaConfig} from "./assets/AssetSchemaConfig";
import {AssetCategoryLogSchemaConfig} from "./assets/AssetCategoryLogSchemaConfig";
import {AssetCategorySchemaConfig} from "./assets/AssetCategorySchemaConfig";
import {AssetPropertyLogSchemaConfig} from "./assets/AssetPropertyLogSchemaConfig";
import {AssetPropertySchemaConfig} from "./assets/AssetPropertySchemaConfig";
import {AssetPicLogSchemaConfig} from "./assets/AssetPicLogSchemaConfig";
import {AssetPicSchemaConfig} from "./assets/AssetPicSchemaConfig";
import {AssetInvoiceLogSchemaConfig} from "./assets/AssetInvoiceLogSchemaConfig";
import {AssetInvoiceSchemaConfig} from "./assets/AssetInvoiceSchemaConfig";
import {TaskSchemaConfig} from "./tasks/TaskSchemaConfig";
import {TaskCheckItemSchemaConfig} from "./tasks/TaskCheckItemSchemaConfig";
import {PlmCodeSchemaConfig} from "./projects/PlmCodeSchemaConfig";
import {PlmDefectSchemaConfig} from "./projects/PlmDefectSchemaConfig";
import {ProjectSchemaConfig} from "./projects/ProjectSchemaConfig";
import {TestProjectSchemaConfig} from "./projects/TestProjectSchemaConfig";
import {Ttv2TestSuiteSchemaConfig} from "./projects/Ttv2TestSuiteSchemaConfig";
import {Ttv2TestSetSchemaConfig} from "./projects/Ttv2TestSetSchemaConfig";
import {Ttv2TestcaseSchemaConfig} from "./projects/Ttv2TestcaseSchemaConfig";
import {ScopeSchemaConfig} from "./users/ScopeSchemaConfig";
import {UserSchemaConfig} from "./users/UserSchemaConfig";
import {UserScopeSchemaConfig} from "./users/UserScopeSchemaConfig";

export const SCHEMAS_CONFIG = {
  [SCHEMA_TYPE.ASSET_LOG]: AssetLogSchemaConfig,
  [SCHEMA_TYPE.ASSET]: AssetSchemaConfig,
  [SCHEMA_TYPE.ASSET_CATEGORY_LOG]: AssetCategoryLogSchemaConfig,
  [SCHEMA_TYPE.ASSET_CATEGORY]: AssetCategorySchemaConfig,
  [SCHEMA_TYPE.ASSET_PROPERTY_LOG]: AssetPropertyLogSchemaConfig,
  [SCHEMA_TYPE.ASSET_PROPERTY]: AssetPropertySchemaConfig,
  [SCHEMA_TYPE.ASSET_PIC_LOG]: AssetPicLogSchemaConfig,
  [SCHEMA_TYPE.ASSET_PIC]: AssetPicSchemaConfig,
  [SCHEMA_TYPE.ASSET_INVOICE_LOG]: AssetInvoiceLogSchemaConfig,
  [SCHEMA_TYPE.ASSET_INVOICE]: AssetInvoiceSchemaConfig,
  [SCHEMA_TYPE.TASK]: TaskSchemaConfig,
  [SCHEMA_TYPE.TASK_CHECK_ITEM]: TaskCheckItemSchemaConfig,
  [SCHEMA_TYPE.PLM_CODE]: PlmCodeSchemaConfig,
  [SCHEMA_TYPE.PLM_DEFECT]: PlmDefectSchemaConfig,
  [SCHEMA_TYPE.PROJECT]: ProjectSchemaConfig,
  [SCHEMA_TYPE.TEST_PROJECT]: TestProjectSchemaConfig,
  [SCHEMA_TYPE.TTV2_TEST_SUITE]: Ttv2TestSuiteSchemaConfig,
  [SCHEMA_TYPE.TTV2_TEST_SET]: Ttv2TestSetSchemaConfig,
  [SCHEMA_TYPE.TTV2_TESTCASE]: Ttv2TestcaseSchemaConfig,
  [SCHEMA_TYPE.SCOPE]: ScopeSchemaConfig,
  [SCHEMA_TYPE.USER]: UserSchemaConfig,
  [SCHEMA_TYPE.USER_SCOPE]: UserScopeSchemaConfig
};