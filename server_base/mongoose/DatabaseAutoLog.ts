import {watchChangeThenUpdateToLog} from "../auto-logs/watchChangeThenUpdateToLog";
import {
    AssetCategoryLogModel,
    AssetCategoryModel,
    AssetInvoiceLogModel,
    AssetInvoiceModel,
    AssetLogModel,
    AssetModel,
    AssetPicLogModel,
    AssetPicModel,
    AssetPropertyLogModel,
    AssetPropertyModel
} from "./DatabaseModels"

export function runAutoLog(){
watchChangeThenUpdateToLog(AssetModel, AssetLogModel);
watchChangeThenUpdateToLog(AssetCategoryModel, AssetCategoryLogModel);
watchChangeThenUpdateToLog(AssetPropertyModel, AssetPropertyLogModel);
watchChangeThenUpdateToLog(AssetPicModel, AssetPicLogModel);
watchChangeThenUpdateToLog(AssetInvoiceModel, AssetInvoiceLogModel);
}