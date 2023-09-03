import mongoose, {Schema} from "mongoose";
import {getSchemaFromFieldConfigs} from "../trpc-dynamic-routes/utils/SchemaBuilder";
import type { AssetLog,Asset,AssetCategoryLog,AssetCategory,AssetPropertyLog,AssetProperty,AssetPicLog,AssetPic,AssetInvoiceLog,AssetInvoice,Task,TaskCheckItem,PlmCode,PlmDefect,Project,TestProject,Ttv2TestSuite,Ttv2TestSet,Ttv2Testcase,Scope,User,UserScope } from "./DatabaseTypes";
import {GenList} from "../../schemas";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

export const AssetLogMongooseSchema = getSchemaFromFieldConfigs<AssetLog>(GenList[SCHEMA_TYPE.ASSET_LOG].schema as any);
export const AssetMongooseSchema = getSchemaFromFieldConfigs<Asset>(GenList[SCHEMA_TYPE.ASSET].schema as any);
export const AssetCategoryLogMongooseSchema = getSchemaFromFieldConfigs<AssetCategoryLog>(GenList[SCHEMA_TYPE.ASSET_CATEGORY_LOG].schema as any);
export const AssetCategoryMongooseSchema = getSchemaFromFieldConfigs<AssetCategory>(GenList[SCHEMA_TYPE.ASSET_CATEGORY].schema as any);
export const AssetPropertyLogMongooseSchema = getSchemaFromFieldConfigs<AssetPropertyLog>(GenList[SCHEMA_TYPE.ASSET_PROPERTY_LOG].schema as any);
export const AssetPropertyMongooseSchema = getSchemaFromFieldConfigs<AssetProperty>(GenList[SCHEMA_TYPE.ASSET_PROPERTY].schema as any);
export const AssetPicLogMongooseSchema = getSchemaFromFieldConfigs<AssetPicLog>(GenList[SCHEMA_TYPE.ASSET_PIC_LOG].schema as any);
export const AssetPicMongooseSchema = getSchemaFromFieldConfigs<AssetPic>(GenList[SCHEMA_TYPE.ASSET_PIC].schema as any);
export const AssetInvoiceLogMongooseSchema = getSchemaFromFieldConfigs<AssetInvoiceLog>(GenList[SCHEMA_TYPE.ASSET_INVOICE_LOG].schema as any);
export const AssetInvoiceMongooseSchema = getSchemaFromFieldConfigs<AssetInvoice>(GenList[SCHEMA_TYPE.ASSET_INVOICE].schema as any);
export const TaskMongooseSchema = getSchemaFromFieldConfigs<Task>(GenList[SCHEMA_TYPE.TASK].schema as any);
export const TaskCheckItemMongooseSchema = getSchemaFromFieldConfigs<TaskCheckItem>(GenList[SCHEMA_TYPE.TASK_CHECK_ITEM].schema as any);
export const PlmCodeMongooseSchema = getSchemaFromFieldConfigs<PlmCode>(GenList[SCHEMA_TYPE.PLM_CODE].schema as any);
export const PlmDefectMongooseSchema = getSchemaFromFieldConfigs<PlmDefect>(GenList[SCHEMA_TYPE.PLM_DEFECT].schema as any);
export const ProjectMongooseSchema = getSchemaFromFieldConfigs<Project>(GenList[SCHEMA_TYPE.PROJECT].schema as any);
export const TestProjectMongooseSchema = getSchemaFromFieldConfigs<TestProject>(GenList[SCHEMA_TYPE.TEST_PROJECT].schema as any);
export const Ttv2TestSuiteMongooseSchema = getSchemaFromFieldConfigs<Ttv2TestSuite>(GenList[SCHEMA_TYPE.TTV2_TEST_SUITE].schema as any);
export const Ttv2TestSetMongooseSchema = getSchemaFromFieldConfigs<Ttv2TestSet>(GenList[SCHEMA_TYPE.TTV2_TEST_SET].schema as any);
export const Ttv2TestcaseMongooseSchema = getSchemaFromFieldConfigs<Ttv2Testcase>(GenList[SCHEMA_TYPE.TTV2_TESTCASE].schema as any);
export const ScopeMongooseSchema = getSchemaFromFieldConfigs<Scope>(GenList[SCHEMA_TYPE.SCOPE].schema as any);
export const UserMongooseSchema = getSchemaFromFieldConfigs<User>(GenList[SCHEMA_TYPE.USER].schema as any);
export const UserScopeMongooseSchema = getSchemaFromFieldConfigs<UserScope>(GenList[SCHEMA_TYPE.USER_SCOPE].schema as any);
export const MONGOOSE_SCHEMA: Record<SCHEMA_TYPE, Schema> = {
  [SCHEMA_TYPE.ASSET_LOG] : AssetLogMongooseSchema,
[SCHEMA_TYPE.ASSET] : AssetMongooseSchema,
[SCHEMA_TYPE.ASSET_CATEGORY_LOG] : AssetCategoryLogMongooseSchema,
[SCHEMA_TYPE.ASSET_CATEGORY] : AssetCategoryMongooseSchema,
[SCHEMA_TYPE.ASSET_PROPERTY_LOG] : AssetPropertyLogMongooseSchema,
[SCHEMA_TYPE.ASSET_PROPERTY] : AssetPropertyMongooseSchema,
[SCHEMA_TYPE.ASSET_PIC_LOG] : AssetPicLogMongooseSchema,
[SCHEMA_TYPE.ASSET_PIC] : AssetPicMongooseSchema,
[SCHEMA_TYPE.ASSET_INVOICE_LOG] : AssetInvoiceLogMongooseSchema,
[SCHEMA_TYPE.ASSET_INVOICE] : AssetInvoiceMongooseSchema,
[SCHEMA_TYPE.TASK] : TaskMongooseSchema,
[SCHEMA_TYPE.TASK_CHECK_ITEM] : TaskCheckItemMongooseSchema,
[SCHEMA_TYPE.PLM_CODE] : PlmCodeMongooseSchema,
[SCHEMA_TYPE.PLM_DEFECT] : PlmDefectMongooseSchema,
[SCHEMA_TYPE.PROJECT] : ProjectMongooseSchema,
[SCHEMA_TYPE.TEST_PROJECT] : TestProjectMongooseSchema,
[SCHEMA_TYPE.TTV2_TEST_SUITE] : Ttv2TestSuiteMongooseSchema,
[SCHEMA_TYPE.TTV2_TEST_SET] : Ttv2TestSetMongooseSchema,
[SCHEMA_TYPE.TTV2_TESTCASE] : Ttv2TestcaseMongooseSchema,
[SCHEMA_TYPE.SCOPE] : ScopeMongooseSchema,
[SCHEMA_TYPE.USER] : UserMongooseSchema,
[SCHEMA_TYPE.USER_SCOPE] : UserScopeMongooseSchema,
};