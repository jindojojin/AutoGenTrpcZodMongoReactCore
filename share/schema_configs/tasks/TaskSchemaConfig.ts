import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {Task} from "../../types/DatabaseTypes";
import _ from "lodash";
export const TaskSchemaConfig: ISchemaConfig<Task> = {
    name:"Task",
    importKeys:[],
    exportKeys:[],
    uniqueKeys:[],
    searchKeys:[],
    relationKeys:["assigner","pic","supporter","reviewer"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        status:{type:BASIC_TYPE.TEXT,required:true,enum:["ASSIGNED","ON-GOING","REVIEW-OK","REVIEW-NOK","CLOSE"],label:"Status"},
	assigner:{type:SCHEMA_TYPE.USER,required:true,label:"Assigner"},
	name:{type:BASIC_TYPE.TEXT,label:"Task name",required:true},
	detail:{type:BASIC_TYPE.TEXT,label:"Detail task"},
	pic:{type:[SCHEMA_TYPE.USER],required:true,label:"Pic"},
	supporter:{type:[SCHEMA_TYPE.USER],label:"Supporter"},
	reviewer:{type:[SCHEMA_TYPE.USER],required:true,label:"Reviewer"},
	plan:{type:BASIC_TYPE.DATE_RANGE,required:true,label:"Plan"},
	finishTime:{type:BASIC_TYPE.DATE,label:"Finish time"},
	reviewTime:{type:BASIC_TYPE.DATE,label:"Review time"},
	attachments:{type:[FILE_TYPE.FILE],label:"Attachments"}
    }
}