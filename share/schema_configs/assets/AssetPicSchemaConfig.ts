import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {AssetPic} from "../../types/DatabaseTypes";
import _ from "lodash";
export const AssetPicSchemaConfig: ISchemaConfig<AssetPic> = {
    name:"Asset Pic",
    importKeys:["asset","pic"],
    exportKeys:[],
    uniqueKeys:[],
    searchKeys:[],
    relationKeys:["asset","pic","projects"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        asset:{type:SCHEMA_TYPE.ASSET,importKey:true,required:true,label:"Asset"},
	pic:{type:SCHEMA_TYPE.USER,required:true,importKey:true,label:"Pic"},
	status:{type:BASIC_TYPE.ENUM,enum:["OK","NOK"],label:"Status"},
	quantity:{type:BASIC_TYPE.NUMBER,required:true,label:"Quantity"},
	projects:{type:[SCHEMA_TYPE.PROJECT],label:"Projects"}
    }
}