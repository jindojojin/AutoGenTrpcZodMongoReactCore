import { DATABASE_ACTIONS } from "./constants/authentication";

import { getSchemaName } from "./SchemaUtils";
import {SCHEMA_TYPE} from "../schemas/SchemaTypes";

export const ADMIN_SCOPE = "SYSTEM_ADMIN";

export enum SPECIFIC_SCOPE {
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  PROJECT_LEADER = "PROJECT_LEADER",
}

export function action2scope(
  table: SCHEMA_TYPE,
  action: DATABASE_ACTIONS,
  field?: string
) {
  const tableEnum = getSchemaName(table).SCHEMA_NAME;
  return field ? `${tableEnum}_${action}_${field}` : `${tableEnum}_${action}`;
}

type Scope = {
  table: SCHEMA_TYPE;
  fields?: string[];
  actions: DATABASE_ACTIONS[];
};

export function getRawScopes(scope?: Scope) {
  if (!scope) return [];
  const { table, fields, actions } = scope;
  const result: string[] = [];
  actions.forEach((action) => {
    if (
      [DATABASE_ACTIONS.CREATE, DATABASE_ACTIONS.DELETE].includes(action) ||
      !fields?.length
    )
      result.push(action2scope(table as SCHEMA_TYPE, action as any));
    else {
      fields?.forEach((f: string) =>
        result.push(action2scope(table as SCHEMA_TYPE, action as any, f))
      );
    }
  });
  return result;
}
