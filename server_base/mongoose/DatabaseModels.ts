import mongoose, {Schema} from "mongoose";
import {SCHEMA_TYPE} from "../../share/types/DataTypes";
import {AssetLogMongooseSchema,AssetMongooseSchema,AssetCategoryLogMongooseSchema,AssetCategoryMongooseSchema,AssetPropertyLogMongooseSchema,AssetPropertyMongooseSchema,AssetPicLogMongooseSchema,AssetPicMongooseSchema,AssetInvoiceLogMongooseSchema,AssetInvoiceMongooseSchema,TaskMongooseSchema,TaskCheckItemMongooseSchema,PlmCodeMongooseSchema,PlmDefectMongooseSchema,ProjectMongooseSchema,TestProjectMongooseSchema,Ttv2TestSuiteMongooseSchema,Ttv2TestSetMongooseSchema,Ttv2TestcaseMongooseSchema,ScopeMongooseSchema,UserMongooseSchema,UserScopeMongooseSchema} from "./MongooseSchemas"

export const AssetLogModel = mongoose.model("AssetLog",  AssetLogMongooseSchema);
 AssetLogModel.syncIndexes()
export const AssetModel = mongoose.model("Asset",  AssetMongooseSchema);
 AssetModel.syncIndexes()
export const AssetCategoryLogModel = mongoose.model("AssetCategoryLog",  AssetCategoryLogMongooseSchema);
 AssetCategoryLogModel.syncIndexes()
export const AssetCategoryModel = mongoose.model("AssetCategory",  AssetCategoryMongooseSchema);
 AssetCategoryModel.syncIndexes()
export const AssetPropertyLogModel = mongoose.model("AssetPropertyLog",  AssetPropertyLogMongooseSchema);
 AssetPropertyLogModel.syncIndexes()
export const AssetPropertyModel = mongoose.model("AssetProperty",  AssetPropertyMongooseSchema);
 AssetPropertyModel.syncIndexes()
export const AssetPicLogModel = mongoose.model("AssetPicLog",  AssetPicLogMongooseSchema);
 AssetPicLogModel.syncIndexes()
export const AssetPicModel = mongoose.model("AssetPic",  AssetPicMongooseSchema);
 AssetPicModel.syncIndexes()
export const AssetInvoiceLogModel = mongoose.model("AssetInvoiceLog",  AssetInvoiceLogMongooseSchema);
 AssetInvoiceLogModel.syncIndexes()
export const AssetInvoiceModel = mongoose.model("AssetInvoice",  AssetInvoiceMongooseSchema);
 AssetInvoiceModel.syncIndexes()
export const TaskModel = mongoose.model("Task",  TaskMongooseSchema);
 TaskModel.syncIndexes()
export const TaskCheckItemModel = mongoose.model("TaskCheckItem",  TaskCheckItemMongooseSchema);
 TaskCheckItemModel.syncIndexes()
export const PlmCodeModel = mongoose.model("PlmCode",  PlmCodeMongooseSchema);
 PlmCodeModel.syncIndexes()
export const PlmDefectModel = mongoose.model("PlmDefect",  PlmDefectMongooseSchema);
 PlmDefectModel.syncIndexes()
export const ProjectModel = mongoose.model("Project",  ProjectMongooseSchema);
 ProjectModel.syncIndexes()
export const TestProjectModel = mongoose.model("TestProject",  TestProjectMongooseSchema);
 TestProjectModel.syncIndexes()
export const Ttv2TestSuiteModel = mongoose.model("Ttv2TestSuite",  Ttv2TestSuiteMongooseSchema);
 Ttv2TestSuiteModel.syncIndexes()
export const Ttv2TestSetModel = mongoose.model("Ttv2TestSet",  Ttv2TestSetMongooseSchema);
 Ttv2TestSetModel.syncIndexes()
export const Ttv2TestcaseModel = mongoose.model("Ttv2Testcase",  Ttv2TestcaseMongooseSchema);
 Ttv2TestcaseModel.syncIndexes()
export const ScopeModel = mongoose.model("Scope",  ScopeMongooseSchema);
 ScopeModel.syncIndexes()
export const UserModel = mongoose.model("User",  UserMongooseSchema);
 UserModel.syncIndexes()
export const UserScopeModel = mongoose.model("UserScope",  UserScopeMongooseSchema);
 UserScopeModel.syncIndexes()
export const DATABASE_MODELS: Record<SCHEMA_TYPE, mongoose.Model<any>> = {
  [SCHEMA_TYPE.ASSET_LOG] : AssetLogModel,
[SCHEMA_TYPE.ASSET] : AssetModel,
[SCHEMA_TYPE.ASSET_CATEGORY_LOG] : AssetCategoryLogModel,
[SCHEMA_TYPE.ASSET_CATEGORY] : AssetCategoryModel,
[SCHEMA_TYPE.ASSET_PROPERTY_LOG] : AssetPropertyLogModel,
[SCHEMA_TYPE.ASSET_PROPERTY] : AssetPropertyModel,
[SCHEMA_TYPE.ASSET_PIC_LOG] : AssetPicLogModel,
[SCHEMA_TYPE.ASSET_PIC] : AssetPicModel,
[SCHEMA_TYPE.ASSET_INVOICE_LOG] : AssetInvoiceLogModel,
[SCHEMA_TYPE.ASSET_INVOICE] : AssetInvoiceModel,
[SCHEMA_TYPE.TASK] : TaskModel,
[SCHEMA_TYPE.TASK_CHECK_ITEM] : TaskCheckItemModel,
[SCHEMA_TYPE.PLM_CODE] : PlmCodeModel,
[SCHEMA_TYPE.PLM_DEFECT] : PlmDefectModel,
[SCHEMA_TYPE.PROJECT] : ProjectModel,
[SCHEMA_TYPE.TEST_PROJECT] : TestProjectModel,
[SCHEMA_TYPE.TTV2_TEST_SUITE] : Ttv2TestSuiteModel,
[SCHEMA_TYPE.TTV2_TEST_SET] : Ttv2TestSetModel,
[SCHEMA_TYPE.TTV2_TESTCASE] : Ttv2TestcaseModel,
[SCHEMA_TYPE.SCOPE] : ScopeModel,
[SCHEMA_TYPE.USER] : UserModel,
[SCHEMA_TYPE.USER_SCOPE] : UserScopeModel,
};