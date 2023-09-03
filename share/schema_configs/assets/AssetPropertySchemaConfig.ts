import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {AssetProperty} from "../../types/DatabaseTypes";
import _ from "lodash";
export const AssetPropertySchemaConfig: ISchemaConfig<AssetProperty> = {
    name:"Asset Property",
    importKeys:[],
    exportKeys:[],
    uniqueKeys:[],
    searchKeys:[],
    relationKeys:["_dynamic_category_"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        _dynamic_category_:{type:SCHEMA_TYPE.ASSET_CATEGORY,hidden:true,label:"Dynamic Category"},
	label:{type:BASIC_TYPE.TEXT,required:true,max:50,label:"Label"},
	type:{type:BASIC_TYPE.ENUM,enum:["Date","DateRange","Time","DateTime","DateTimeRange","String","Number","Enum","Boolean","Unknown","File","Image","Video","Audio"],label:"Type"},
	enum:{type:[BASIC_TYPE.TEXT],nullable:true,label:"Enum"},
	hint:{type:BASIC_TYPE.TEXT,label:"Hint"},
	required:{type:BASIC_TYPE.BOOLEAN,label:"Required"},
	nullable:{type:BASIC_TYPE.BOOLEAN,label:"Nullable"},
	importKey:{type:BASIC_TYPE.BOOLEAN,label:"Import Key"},
	exportKey:{type:BASIC_TYPE.BOOLEAN,label:"Export Key"},
	searchKey:{type:BASIC_TYPE.BOOLEAN,label:"Search Key"},
	unique:{type:BASIC_TYPE.BOOLEAN,label:"Unique"},
	enumLabel:{type:[BASIC_TYPE.TEXT],label:"Enum Label"},
	min:{type:BASIC_TYPE.NUMBER,label:"Min"},
	max:{type:BASIC_TYPE.NUMBER,label:"Max"},
	default:{type:BASIC_TYPE.UNKNOWN,label:"Default"},
	orderIdx:{type:BASIC_TYPE.NUMBER,label:"Order Idx"},
	hidden:{type:BASIC_TYPE.BOOLEAN,hidden:true,label:"Hidden"},
	immutable:{type:BASIC_TYPE.BOOLEAN,hidden:true,label:"Immutable"}
    }
}