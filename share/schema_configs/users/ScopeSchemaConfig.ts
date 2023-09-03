import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {Scope} from "../../types/DatabaseTypes";
import _ from "lodash";
export const ScopeSchemaConfig: ISchemaConfig<Scope> = {
    name:"Scope",
    importKeys:["name"],
    exportKeys:[],
    uniqueKeys:["name"],
    searchKeys:[],
    relationKeys:[],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        name:{type:BASIC_TYPE.TEXT,unique:true,required:true,importKey:true,label:"Name"},
	actions:{type:[BASIC_TYPE.ENUM],required:true,enum:["Create","Read","Update","Delete"],label:"Restricted actions"},
	table:{type:BASIC_TYPE.ENUM,required:true,enum:["User","Scope","User Group","Project","Test Project","PLM Code","PLM Defect","TTv2 Test suite","TTv2 Test set","TTv2 Testcase","Task","Task Check Item","Asset","Asset Log","Asset Invoice","Asset Invoice Log","Asset Category","Asset Category Log","Asset Pic","Asset Pic Log","Asset Property","Asset Property Log"],label:"Data table"},
	fields:{type:[BASIC_TYPE.TEXT],required:true,label:"Restricted data",hint:"Only support in 'View' and 'Edit' actions"}
    }
}