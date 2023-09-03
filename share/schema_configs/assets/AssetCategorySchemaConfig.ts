import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {AssetCategory} from "../../types/DatabaseTypes";
import _ from "lodash";
export const AssetCategorySchemaConfig: ISchemaConfig<AssetCategory> = {
    name:"Asset Category",
    importKeys:["_dynamic_category_"],
    exportKeys:["_dynamic_category_"],
    uniqueKeys:["_dynamic_category_"],
    searchKeys:["_dynamic_category_"],
    relationKeys:[],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        _dynamic_category_:{type:BASIC_TYPE.TEXT,unique:true,required:true,exportKey:true,importKey:true,searchKey:true,label:"Dynamic Category"}
    }
}