import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {TaskCheckItem} from "../../types/DatabaseTypes";
import _ from "lodash";
export const TaskCheckItemSchemaConfig: ISchemaConfig<TaskCheckItem> = {
    name:"Task Check Item",
    importKeys:[],
    exportKeys:[],
    uniqueKeys:[],
    searchKeys:[],
    relationKeys:["task","pic","reviewer"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        task:{type:SCHEMA_TYPE.TASK,required:true,label:"Task"},
	description:{type:BASIC_TYPE.TEXT,required:true,label:"Todo"},
	pic:{type:SCHEMA_TYPE.USER,label:"Pic"},
	reviewer:{type:SCHEMA_TYPE.USER,label:"Reviewer"},
	finishTime:{type:BASIC_TYPE.TIME,label:"Finish Time"},
	reviewTime:{type:BASIC_TYPE.TIME,label:"Review Time"},
	result:{type:BASIC_TYPE.TEXT,enum:["PASS","FAIL"],label:"Result"},
	score:{type:BASIC_TYPE.NUMBER,min:0,max:5,label:"Score"},
	comment:{type:BASIC_TYPE.TEXT,label:"Comment"}
    }
}