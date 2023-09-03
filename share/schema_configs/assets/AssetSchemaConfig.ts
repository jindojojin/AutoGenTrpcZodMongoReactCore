import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {Asset} from "../../types/DatabaseTypes";
import _ from "lodash";
export const AssetSchemaConfig: ISchemaConfig<Asset> = {
    name:"Asset",
    importKeys:[],
    exportKeys:[],
    uniqueKeys:[],
    searchKeys:[],
    relationKeys:["_dynamic_category_","invoice"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        _dynamic_category_:{type:SCHEMA_TYPE.ASSET_CATEGORY,hidden:true,label:"Dynamic Category"},
	invoice:{type:SCHEMA_TYPE.ASSET_INVOICE,nullable:true,label:"Invoice"},
	quantity:{type:BASIC_TYPE.NUMBER,label:"Quantity"}
    }
}