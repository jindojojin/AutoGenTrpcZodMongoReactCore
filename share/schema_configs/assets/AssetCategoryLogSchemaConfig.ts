import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {AssetCategoryLog} from "../../types/DatabaseTypes";
import _ from "lodash";
export const AssetCategoryLogSchemaConfig: ISchemaConfig<AssetCategoryLog> = {
    name:"Asset Category Log",
    importKeys:[],
    exportKeys:[],
    uniqueKeys:[],
    searchKeys:[],
    relationKeys:["document","triggerBy"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        document:{type:SCHEMA_TYPE.ASSET_CATEGORY,label:"Document"},
	triggerBy:{type:SCHEMA_TYPE.USER,nullable:true,label:"Trigger By"},
	operation:{type:BASIC_TYPE.TEXT,label:"Operation"},
	changeData:{type:BASIC_TYPE.UNKNOWN,label:"Change Data"}
    }
}