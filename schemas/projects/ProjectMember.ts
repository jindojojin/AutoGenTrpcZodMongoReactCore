import { BASIC_TYPE } from "../../share/types/DataTypes";
import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import { SCHEMA_TYPE } from "../SchemaTypes";

export const ProjectMemberSchema : ISchemaDefinition={
    testProject: {type:SCHEMA_TYPE.TEST_PROJECT, required:true, hidden:true},
    tester: {type: SCHEMA_TYPE.USER},
    autoSyncFromTTv2:{type:BASIC_TYPE.BOOLEAN},
    exclude: {type: BASIC_TYPE.BOOLEAN},
}