import { DATABASE_ACTIONS } from "./constants/authentication";

import _ from "lodash";
import { SCHEMA_TYPE } from "../schemas/SchemaTypes";
import { getSchemaName } from "./SchemaUtils";
import { VIEW_TYPE } from "../views/ViewTypes";
import { TABLE_API } from "../custom_apis/TableAPI";

export const ADMIN_SCOPE = "SYSTEM_ADMIN";

export enum SPECIFIC_SCOPE {
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  PROJECT_LEADER = "PROJECT_LEADER",
}

export function action2scope(
    table: SCHEMA_TYPE | VIEW_TYPE | TABLE_API,
    action: DATABASE_ACTIONS,
    field?: string,
) {
  const tableEnum = getSchemaName(table).SCHEMA_NAME;
  return JSON.stringify(_.omitBy({ table, action, field }, _.isNil));
}

type Scope = {
  table: SCHEMA_TYPE;
  actions: DATABASE_ACTIONS[];
  fields?: string[];
};

type SingleScope = {
  table: SCHEMA_TYPE;
  action: DATABASE_ACTIONS;
  field?: string;
};

export function getRawScopes(scope?: Scope) {
  if (!scope) return [];
  const { table, fields, actions } = scope;
  const combinations: any[] = _.flatMap(actions, (action) =>
      fields?.length
          ? _.flatMap(fields, (field) => ({ table: scope.table, action, field }))
          : {
            table: scope.table,
            action,
          },
  );
  return combinations.map((com) =>
      action2scope(com.table, com.action, com.field),
  );
}

function checkScope(requiredScope: string, scope: string) {
  try {
    const required = JSON.parse(requiredScope) as SingleScope;
    const available = JSON.parse(requiredScope) as SingleScope;
    return available.field
        ? _.isEqual(required, available)
        : _.isEqual(_.omit(required, ["field"]), available);
  } catch (e) {
    return false;
  }
}

export function checkScopes(
    systemScopes: string[],
    requiredScopes: string | string[],
    userScopes: string[],
) {
  if (userScopes.includes(SPECIFIC_SCOPE.SYSTEM_ADMIN)) return true;
  requiredScopes = Array.isArray(requiredScopes)
      ? requiredScopes
      : [requiredScopes];
  const actualRequiredScopes = requiredScopes.filter(
      (scope) => systemScopes.find((sc) => checkScope(scope, sc)) != null,
  );
  // console.log(
  //   "User scope",
  //   userScopes,
  //   "Required scopes",
  //   actualRequiredScopes,
  // );
  for (let i = 0; i < actualRequiredScopes.length; i++) {
    const requiredScope = actualRequiredScopes[i];
    if (userScopes.find((us) => checkScope(requiredScope, us)) == null)
      return false;
  }
  console.log("true here!");
  return true;
}
