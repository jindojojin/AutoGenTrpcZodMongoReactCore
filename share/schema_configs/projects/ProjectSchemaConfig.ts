import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {Project} from "../../types/DatabaseTypes";
import _ from "lodash";
export const ProjectSchemaConfig: ISchemaConfig<Project> = {
    name:"Project",
    importKeys:["name"],
    exportKeys:["name"],
    uniqueKeys:["name","alias_1","alias_2","alias_3"],
    searchKeys:["name","alias_1","alias_2","alias_3"],
    relationKeys:[],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        logo:{type:FILE_TYPE.IMAGE,label:"Logo"},
	name:{type:BASIC_TYPE.TEXT,unique:true,required:true,searchKey:true,exportKey:true,importKey:true,label:"Name"},
	alias_1:{type:BASIC_TYPE.TEXT,unique:true,searchKey:true,label:"Alias 1"},
	alias_2:{type:BASIC_TYPE.TEXT,unique:true,searchKey:true,label:"Alias 2"},
	alias_3:{type:BASIC_TYPE.TEXT,unique:true,searchKey:true,label:"Alias 3"}
    }
}