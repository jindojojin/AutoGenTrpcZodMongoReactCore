import {DATABASE_ACTIONS} from "../../share/constants/authentication";
import {AUTH_USER_ID_FIELD, AUTH_USER_PWD_FIELD, AUTH_USER_SALT_FIELD,} from "../../share/constants/database_fields";
import {BASIC_TYPE} from "../../share/types/DataTypes";
import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

export const SystemUserSchema: ISchemaDefinition = {
  [AUTH_USER_ID_FIELD]: {
    type: BASIC_TYPE.TEXT,
    unique: true,
    required: true,
    label: "Username",
    immutable: true,
  },
  [AUTH_USER_PWD_FIELD]: { type: BASIC_TYPE.TEXT, private: true },
  [AUTH_USER_SALT_FIELD]: { type: BASIC_TYPE.TEXT, private: true },
};

export const SystemScopeSchema: ISchemaDefinition<
  any & { actions: string[]; table: string; fields?: string[] }
> = {
  name: {
    type: BASIC_TYPE.TEXT,
    unique: true,
    required: true,
    importKey: true,
  },
  actions: {
    type: [BASIC_TYPE.ENUM],
    required: true,
    enum: Object.values(DATABASE_ACTIONS),
    label: "Restricted actions",
  },
  table: {
    type: BASIC_TYPE.ENUM,
    required: true,
    enum: Object.values(SCHEMA_TYPE),
    label: "Data table",
  },
  fields: {
    type: [BASIC_TYPE.TEXT],
    required: true,
    label: "Restricted data",
    hint: "Only support in 'View' and 'Edit' actions",
  },
};

export const SystemUserScopeSchema: ISchemaDefinition = {
  top: {
    type: SCHEMA_TYPE.USER_SCOPE,
    nullable: true,
  },
  name: {
    type: BASIC_TYPE.TEXT,
    unique: true,
    required: true,
    label: "Group name",
  },
  members: {
    type: [SCHEMA_TYPE.USER],
  },
  scopes: {
    type: [SCHEMA_TYPE.SCOPE],
    label: "Permissions",
  },
};