import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {Ttv2TestSet} from "../../types/DatabaseTypes";
import _ from "lodash";
export const Ttv2TestSetSchemaConfig: ISchemaConfig<Ttv2TestSet> = {
    name:"TTv2 Test set",
    importKeys:["id"],
    exportKeys:[],
    uniqueKeys:["id"],
    searchKeys:[],
    relationKeys:["tpid"],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        tpid:{type:SCHEMA_TYPE.TTV2_TEST_SUITE,hidden:true,label:"Tpid"},
	id:{type:BASIC_TYPE.NUMBER,required:true,unique:true,importKey:true,label:"Set ID"},
	category:{type:BASIC_TYPE.TEXT,label:"Category"},
	title:{type:BASIC_TYPE.TEXT,label:"Title"},
	state:{type:BASIC_TYPE.NUMBER,hidden:true,label:"State"},
	syncFlag:{type:BASIC_TYPE.BOOLEAN,label:"Sync Flag"}
    }
}