import {ISchemaDefinition} from "../../../share/types/ISchemaDefinition";
import {CREATED_BY, DELETED_BY, LAST_MODIFIED_BY} from "../../../share/constants/database_fields";
import {SCHEMA_TYPE} from "../../../schemas/SchemaTypes";

export const DefaultSchema: ISchemaDefinition = {
    [LAST_MODIFIED_BY]: {
        type: SCHEMA_TYPE.USER,
        nullable: true,
        hidden: true,
    },
    [CREATED_BY]: {
        type: SCHEMA_TYPE.USER,
        nullable: true,
        hidden: true,
    },
    [DELETED_BY]: {
        type: SCHEMA_TYPE.USER,
        nullable: true,
        hidden: true,
    }
}