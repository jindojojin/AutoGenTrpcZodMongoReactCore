import {BASIC_TYPE} from "../../share/types/DataTypes";
import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";

export const ProjectMemberBlacklistSchema: ISchemaDefinition = {
    testProject: {type: SCHEMA_TYPE.TEST_PROJECT},
    user: {type: SCHEMA_TYPE.USER},
}
