import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {AssetInvoice} from "../../types/DatabaseTypes";
import _ from "lodash";
export const AssetInvoiceSchemaConfig: ISchemaConfig<AssetInvoice> = {
    name:"Asset Invoice",
    importKeys:[],
    exportKeys:[],
    uniqueKeys:[],
    searchKeys:[],
    relationKeys:[],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        file:{type:FILE_TYPE.FILE,label:"File"},
	name:{type:BASIC_TYPE.TEXT,required:true,label:"Name"}
    }
}