import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {Ttv2Testcase} from "../../types/DatabaseTypes";
import _ from "lodash";
export const Ttv2TestcaseSchemaConfig: ISchemaConfig<Ttv2Testcase> = {
    name:"TTv2 Testcase",
    importKeys:["id"],
    exportKeys:[],
    uniqueKeys:["id"],
    searchKeys:[],
    relationKeys:["top","pid","tester","reviewer","assigned_tester","assigned_reviewer"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        id:{type:BASIC_TYPE.NUMBER,unique:true,importKey:true,label:"Id"},
	top:{type:SCHEMA_TYPE.TTV2_TEST_SET,label:"Test Set"},
	pid:{type:SCHEMA_TYPE.TTV2_TESTCASE,label:"Folder",nullable:true},
	tcid:{type:BASIC_TYPE.NUMBER,label:"Tcid"},
	title:{type:BASIC_TYPE.TEXT,label:"Title"},
	state:{type:BASIC_TYPE.ENUM,enum:["READY","SKIPPED","TESTING","PAUSE","TEST_NOK","TEST_OK","REVIEWING","REVIEW_PAUSE","REVIEW_NOK","REVIEW_OK","TEST_SUITE_RUNNING","TEST_SUITE_STOPPED"],label:"State"},
	tester:{type:SCHEMA_TYPE.USER,nullable:true,label:"Tester"},
	reviewer:{type:SCHEMA_TYPE.USER,nullable:true,label:"Reviewer"},
	assigned_tester:{type:SCHEMA_TYPE.USER,nullable:true,label:"Assigned Tester"},
	assigned_reviewer:{type:SCHEMA_TYPE.USER,nullable:true,label:"Assigned Reviewer"},
	due_test:{type:BASIC_TYPE.DATE,label:"Due Test"},
	due_review:{type:BASIC_TYPE.DATE,label:"Due Review"}
    }
}