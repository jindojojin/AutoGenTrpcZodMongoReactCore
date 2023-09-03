// Table name use for create relationship in schemas and automatic generate route,.....


import {GenConfig} from "../server_base/genUtils";
import {
    getDynamicSchemaGenConfigs
} from "../server_base/trpc-dynamic-routes/dynamic_table_schema/getDynamicSchemaDefinition";
import {SystemScopeSchema, SystemUserScopeSchema} from "../server_base/basic-auth/AuthSchemas";
import {UserSchema} from "./users/User";
import {SCHEMA_TYPE} from "./SchemaTypes";

export const GenList: Record<SCHEMA_TYPE, GenConfig> = {
  ...getDynamicSchemaGenConfigs(
      {
        data: SCHEMA_TYPE.HO_SO,
        dataLog: SCHEMA_TYPE.LOG_HO_SO,
        category: SCHEMA_TYPE.LOAI_HO_SO,
        categoryLog: SCHEMA_TYPE.LOG_LOAI_HO_SO,
        property: SCHEMA_TYPE.THUOC_TINH_HO_SO,
        propertyLog: SCHEMA_TYPE.LOG_THUOC_TINH_HO_SO,
      },
      "records",
  ),

  [SCHEMA_TYPE.SCOPE]: { schema: SystemScopeSchema, folder: "users" },
  [SCHEMA_TYPE.USER]: { schema: UserSchema, folder: "users" },
  [SCHEMA_TYPE.USER_SCOPE]: { schema: SystemUserScopeSchema, folder: "users" },
};
