import { watchChangeThenUpdateToLog } from "../utils/auto-logs/watchChangeThenUpdateToLog";
import {AssetModel,AssetLogModel,AssetCategoryModel,AssetCategoryLogModel,AssetPropertyModel,AssetPropertyLogModel,AssetPicModel,AssetPicLogModel,AssetInvoiceModel,AssetInvoiceLogModel} from "./DatabaseModels"
export function runAutoLog(){
watchChangeThenUpdateToLog(AssetModel, AssetLogModel);
watchChangeThenUpdateToLog(AssetCategoryModel, AssetCategoryLogModel);
watchChangeThenUpdateToLog(AssetPropertyModel, AssetPropertyLogModel);
watchChangeThenUpdateToLog(AssetPicModel, AssetPicLogModel);
watchChangeThenUpdateToLog(AssetInvoiceModel, AssetInvoiceLogModel);
}