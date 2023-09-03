import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {PlmDefect} from "../../types/DatabaseTypes";
import _ from "lodash";
export const PlmDefectSchemaConfig: ISchemaConfig<PlmDefect> = {
    name:"PLM Defect",
    importKeys:["case_code"],
    exportKeys:[],
    uniqueKeys:["case_code"],
    searchKeys:[],
    relationKeys:["plm_code","user_submit"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        plm_code:{type:SCHEMA_TYPE.PLM_CODE,label:"Dev. Mdl. Name/Item Name"},
	case_code:{type:BASIC_TYPE.TEXT,required:true,importKey:true,unique:true,label:"Case Code"},
	plm_link:{type:BASIC_TYPE.TEXT,hidden:true,label:"Case Code_hyperlink"},
	title:{type:BASIC_TYPE.TEXT,required:true,label:"Title"},
	priority:{type:BASIC_TYPE.ENUM,enum:["A","B","C"],required:true,label:"Priority"},
	register_by:{type:BASIC_TYPE.TEXT,label:"Reg. by",immutable:true},
	user_submit:{type:SCHEMA_TYPE.USER,nullable:true,label:"Register E-Mail",hint:"Null if not submitted by system's user"},
	testcase_id:{type:BASIC_TYPE.TEXT,label:"Test Case ID"},
	cl_number:{type:BASIC_TYPE.TEXT,label:"CL Number"},
	problem_status:{type:BASIC_TYPE.ENUM,enum:["Open","Resolve","Close","Delete"],label:"Progr.Stat."},
	resolution_type:{type:BASIC_TYPE.TEXT,label:"Resolution Type"},
	defect_type:{type:BASIC_TYPE.TEXT,label:"Defect Type"},
	rej_reason:{type:BASIC_TYPE.TEXT,label:"Rej. Reason"},
	defect_class:{type:BASIC_TYPE.TEXT,label:"Defect Class"},
	registered_date:{type:BASIC_TYPE.DATE,label:"Registered Date"},
	resolve_date:{type:BASIC_TYPE.DATE,nullable:true,label:"Resolve Date"}
    }
}