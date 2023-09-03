import {SCHEMA_TYPE} from "../../share/types/DataTypes";
import {AssetLogBaseRouter} from "./assets/AssetLogBaseRouter";
import {AssetBaseRouter} from "./assets/AssetBaseRouter";
import {AssetCategoryLogBaseRouter} from "./assets/AssetCategoryLogBaseRouter";
import {AssetCategoryBaseRouter} from "./assets/AssetCategoryBaseRouter";
import {AssetPropertyLogBaseRouter} from "./assets/AssetPropertyLogBaseRouter";
import {AssetPropertyBaseRouter} from "./assets/AssetPropertyBaseRouter";
import {AssetPicLogBaseRouter} from "./assets/AssetPicLogBaseRouter";
import {AssetPicBaseRouter} from "./assets/AssetPicBaseRouter";
import {AssetInvoiceLogBaseRouter} from "./assets/AssetInvoiceLogBaseRouter";
import {AssetInvoiceBaseRouter} from "./assets/AssetInvoiceBaseRouter";
import {TaskBaseRouter} from "./tasks/TaskBaseRouter";
import {TaskCheckItemBaseRouter} from "./tasks/TaskCheckItemBaseRouter";
import {PlmCodeBaseRouter} from "./projects/PlmCodeBaseRouter";
import {PlmDefectBaseRouter} from "./projects/PlmDefectBaseRouter";
import {ProjectBaseRouter} from "./projects/ProjectBaseRouter";
import {TestProjectBaseRouter} from "./projects/TestProjectBaseRouter";
import {Ttv2TestSuiteBaseRouter} from "./projects/Ttv2TestSuiteBaseRouter";
import {Ttv2TestSetBaseRouter} from "./projects/Ttv2TestSetBaseRouter";
import {Ttv2TestcaseBaseRouter} from "./projects/Ttv2TestcaseBaseRouter";
import {ScopeBaseRouter} from "./users/ScopeBaseRouter";
import {UserBaseRouter} from "./users/UserBaseRouter";
import {UserScopeBaseRouter} from "./users/UserScopeBaseRouter";

export const BASE_ROUTERS = {
  [SCHEMA_TYPE.ASSET_LOG]: AssetLogBaseRouter(),
  [SCHEMA_TYPE.ASSET]: AssetBaseRouter(),
  [SCHEMA_TYPE.ASSET_CATEGORY_LOG]: AssetCategoryLogBaseRouter(),
  [SCHEMA_TYPE.ASSET_CATEGORY]: AssetCategoryBaseRouter(),
  [SCHEMA_TYPE.ASSET_PROPERTY_LOG]: AssetPropertyLogBaseRouter(),
  [SCHEMA_TYPE.ASSET_PROPERTY]: AssetPropertyBaseRouter(),
  [SCHEMA_TYPE.ASSET_PIC_LOG]: AssetPicLogBaseRouter(),
  [SCHEMA_TYPE.ASSET_PIC]: AssetPicBaseRouter(),
  [SCHEMA_TYPE.ASSET_INVOICE_LOG]: AssetInvoiceLogBaseRouter(),
  [SCHEMA_TYPE.ASSET_INVOICE]: AssetInvoiceBaseRouter(),
  [SCHEMA_TYPE.TASK]: TaskBaseRouter(),
  [SCHEMA_TYPE.TASK_CHECK_ITEM]: TaskCheckItemBaseRouter(),
  [SCHEMA_TYPE.PLM_CODE]: PlmCodeBaseRouter(),
  [SCHEMA_TYPE.PLM_DEFECT]: PlmDefectBaseRouter(),
  [SCHEMA_TYPE.PROJECT]: ProjectBaseRouter(),
  [SCHEMA_TYPE.TEST_PROJECT]: TestProjectBaseRouter(),
  [SCHEMA_TYPE.TTV2_TEST_SUITE]: Ttv2TestSuiteBaseRouter(),
  [SCHEMA_TYPE.TTV2_TEST_SET]: Ttv2TestSetBaseRouter(),
  [SCHEMA_TYPE.TTV2_TESTCASE]: Ttv2TestcaseBaseRouter(),
  [SCHEMA_TYPE.SCOPE]: ScopeBaseRouter(),
  [SCHEMA_TYPE.USER]: UserBaseRouter(),
  [SCHEMA_TYPE.USER_SCOPE]: UserScopeBaseRouter()
};