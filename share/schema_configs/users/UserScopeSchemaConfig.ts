import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {UserScope} from "../../types/DatabaseTypes";
import _ from "lodash";
export const UserScopeSchemaConfig: ISchemaConfig<UserScope> = {
    name:"User Group",
    importKeys:[],
    exportKeys:[],
    uniqueKeys:["name"],
    searchKeys:[],
    relationKeys:["top","members","scopes"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        top:{type:SCHEMA_TYPE.USER_SCOPE,nullable:true,label:"Top"},
	name:{type:BASIC_TYPE.TEXT,unique:true,required:true,label:"Group name"},
	members:{type:[SCHEMA_TYPE.USER],label:"Members"},
	scopes:{type:[SCHEMA_TYPE.SCOPE],label:"Permissions"}
    }
}