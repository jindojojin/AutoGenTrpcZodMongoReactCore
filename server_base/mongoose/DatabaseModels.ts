// This file is template only, will be auto gen
import mongoose from "mongoose";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {SystemScopeSchema, SystemUserSchema, SystemUserScopeSchema} from "../basic-auth/AuthSchemas";
import {getSchemaFromFieldConfigs} from "../trpc-dynamic-routes/utils/SchemaBuilder";
import {DefaultSchema} from "../trpc-dynamic-routes/utils/DefaultSchema";

const UserModel = mongoose.model("User", getSchemaFromFieldConfigs({...SystemUserSchema, ...DefaultSchema}))
const UserScopeModel = mongoose.model("UserScope", getSchemaFromFieldConfigs({...SystemUserScopeSchema, ...DefaultSchema}))
const ScopeModel = mongoose.model("Scope", getSchemaFromFieldConfigs({...SystemScopeSchema, ...DefaultSchema}))
export const DATABASE_MODELS = {
    [SCHEMA_TYPE.USER]: UserModel,
    [SCHEMA_TYPE.SCOPE]: ScopeModel,
    [SCHEMA_TYPE.USER_SCOPE]: UserScopeModel
};