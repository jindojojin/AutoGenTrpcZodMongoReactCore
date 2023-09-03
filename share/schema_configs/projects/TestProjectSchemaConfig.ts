import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {TestProject} from "../../types/DatabaseTypes";
import _ from "lodash";
export const TestProjectSchemaConfig: ISchemaConfig<TestProject> = {
    name:"Test Project",
    importKeys:[],
    exportKeys:[],
    uniqueKeys:[],
    searchKeys:[],
    relationKeys:["project","pa"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        project:{type:SCHEMA_TYPE.PROJECT,required:true,label:"Project"},
	packageVersion:{type:BASIC_TYPE.TEXT,required:true,label:"Package Version"},
	pa:{type:SCHEMA_TYPE.USER,required:true,label:"Pa"},
	note:{type:BASIC_TYPE.TEXT,label:"Note"},
	schedule:{type:BASIC_TYPE.DATE_RANGE,label:"Schedule"}
    }
}