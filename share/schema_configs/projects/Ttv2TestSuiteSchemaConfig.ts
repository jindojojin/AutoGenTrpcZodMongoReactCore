import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {Ttv2TestSuite} from "../../types/DatabaseTypes";
import _ from "lodash";
export const Ttv2TestSuiteSchemaConfig: ISchemaConfig<Ttv2TestSuite> = {
    name:"TTv2 Test suite",
    importKeys:["id"],
    exportKeys:[],
    uniqueKeys:["id"],
    searchKeys:[],
    relationKeys:["testProject"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        testProject:{type:SCHEMA_TYPE.TEST_PROJECT,hidden:true,label:"Test Project"},
	id:{type:BASIC_TYPE.NUMBER,required:true,unique:true,importKey:true,label:"Suite ID"},
	name:{type:BASIC_TYPE.TEXT,label:"Name"},
	iplan_start:{type:BASIC_TYPE.DATE,nullable:true,label:"Iplan Start"},
	iplan_end:{type:BASIC_TYPE.DATE,nullable:true,label:"Iplan End"},
	mplan_start:{type:BASIC_TYPE.DATE,nullable:true,label:"Mplan Start"},
	mplan_end:{type:BASIC_TYPE.DATE,nullable:true,label:"Mplan End"},
	iplan_ga:{type:BASIC_TYPE.DATE,nullable:true,label:"Iplan Ga"},
	mplan_ga:{type:BASIC_TYPE.DATE,nullable:true,label:"Mplan Ga"},
	lastSync:{type:BASIC_TYPE.DATE,label:"Last Sync"}
    }
}