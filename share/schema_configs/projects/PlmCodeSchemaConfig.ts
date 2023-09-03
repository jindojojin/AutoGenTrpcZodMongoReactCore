import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {PlmCode} from "../../types/DatabaseTypes";
import _ from "lodash";
export const PlmCodeSchemaConfig: ISchemaConfig<PlmCode> = {
    name:"PLM Code",
    importKeys:["plmCode"],
    exportKeys:[],
    uniqueKeys:["plmCode"],
    searchKeys:[],
    relationKeys:["testProject"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        testProject:{type:SCHEMA_TYPE.TEST_PROJECT,hidden:true,label:"Test Project"},
	plmCode:{type:BASIC_TYPE.TEXT,unique:true,importKey:true,required:true,label:"Dev. Mdl. Name/Item Name"},
	note:{type:BASIC_TYPE.TEXT,label:"Note"},
	lastSync:{type:BASIC_TYPE.DATE,label:"Last Sync"}
    }
}