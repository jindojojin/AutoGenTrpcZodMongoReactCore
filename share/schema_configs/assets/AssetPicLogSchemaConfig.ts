import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {AssetPicLog} from "../../types/DatabaseTypes";
import _ from "lodash";
export const AssetPicLogSchemaConfig: ISchemaConfig<AssetPicLog> = {
    name:"Asset Pic Log",
    importKeys:[],
    exportKeys:[],
    uniqueKeys:[],
    searchKeys:[],
    relationKeys:["document","triggerBy"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        document:{type:SCHEMA_TYPE.ASSET_PIC,label:"Document"},
	triggerBy:{type:SCHEMA_TYPE.USER,nullable:true,label:"Trigger By"},
	operation:{type:BASIC_TYPE.TEXT,label:"Operation"},
	changeData:{type:BASIC_TYPE.UNKNOWN,label:"Change Data"}
    }
}