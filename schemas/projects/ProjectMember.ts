import { BASIC_TYPE } from "../../share/types/DataTypes";
import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import { SCHEMA_TYPE } from "../SchemaTypes";

export const ProjectMemberSchema : ISchemaDefinition={
    project: {type:SCHEMA_TYPE.TEST_PROJECT, required:true},
    tester: {type: SCHEMA_TYPE.USER},
    exclude: {type: BASIC_TYPE.BOOLEAN}
}