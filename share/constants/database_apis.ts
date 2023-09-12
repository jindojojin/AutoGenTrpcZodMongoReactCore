import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

export type API_NAME = "scope"|"user"|"userScope"
export const DATABASE_APIS: Record<SCHEMA_TYPE, API_NAME> = {
  [SCHEMA_TYPE.SCOPE]: "scope",
  [SCHEMA_TYPE.USER]: "user",
  [SCHEMA_TYPE.USER_SCOPE]: "userScope"
} as any;