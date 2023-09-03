import {z} from "zod";
import { BASIC_TYPE, FILE_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import {ISchemaConfig} from "../../types/ISchemaConfig";
import {User} from "../../types/DatabaseTypes";
import _ from "lodash";
export const UserSchemaConfig: ISchemaConfig<User> = {
    name:"User",
    importKeys:[],
    exportKeys:["fullName","emailAddress"],
    uniqueKeys:["_user_login_id_","emailAddress","ttv2ID"],
    searchKeys:["fullName","employeeNumber","emailAddress"],
    relationKeys:[],
    fieldConfigs:{
        _id:{type: BASIC_TYPE.TEXT,label: "ID",hidden:true},
        _user_login_id_:{type:BASIC_TYPE.TEXT,unique:true,required:true,label:"Username",immutable:true},
	fullName:{type:BASIC_TYPE.TEXT,exportKey:true,searchKey:true,label:"Full Name"},
	employeeNumber:{type:BASIC_TYPE.TEXT,label:"Gen Number",searchKey:true},
	epId:{type:BASIC_TYPE.TEXT,label:"Employee ID",immutable:true},
	emailAddress:{type:BASIC_TYPE.TEXT,label:"Email",unique:true,exportKey:true,searchKey:true,immutable:true},
	avatar:{type:FILE_TYPE.IMAGE,label:"Avatar"},
	ttv2ID:{type:BASIC_TYPE.NUMBER,label:"TTv2 ID",unique:true},
	nickName:{type:BASIC_TYPE.TEXT,nullable:true,label:"Nick Name"},
	birthday:{type:BASIC_TYPE.DATE,label:"Birthday"},
	external:{type:BASIC_TYPE.BOOLEAN,label:"External"}
    }
}