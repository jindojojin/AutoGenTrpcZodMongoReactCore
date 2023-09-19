import { DATABASE_ACTIONS } from "./constants/authentication";

import { getSchemaName } from "./SchemaUtils";
import { SCHEMA_TYPE } from "../schemas/SchemaTypes";
import _ from "lodash";

export const ADMIN_SCOPE = "SYSTEM_ADMIN";

export enum SPECIFIC_SCOPE {
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  PROJECT_LEADER = "PROJECT_LEADER",
}

export function action2scope(
    table: SCHEMA_TYPE,
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

export function getRawScopes(scope?: Scope) {
  if (!scope) return [];
  const { table, fields, actions } = scope;
  const result: string[] = [];
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

export function checkScope(
    systemScopes: string[],
    requiredScopes: string | string[],
    userScopes: string[],
) {
  if (userScopes.includes(SPECIFIC_SCOPE.SYSTEM_ADMIN)) return true;
  requiredScopes = Array.isArray(requiredScopes)
      ? requiredScopes
      : [requiredScopes];
  const actualRequiredScopes = requiredScopes.filter((scope) => {
    if (
        scope.endsWith(DATABASE_ACTIONS.READ) ||
        scope.endsWith(DATABASE_ACTIONS.UPDATE)
    ) {
      return (
          systemScopes.find((systemScope) => systemScope.startsWith(scope)) !=
          null
      );
    } else return systemScopes.includes(scope);
  });
  console.log(
      "User scope",
      userScopes,
      "Required scopes",
      actualRequiredScopes,
  );
  for (let i = 0; i < actualRequiredScopes.length; i++) {
    const requiredScope = actualRequiredScopes[i];
    if (!userScopes.includes(requiredScope)) return false;
  }
  console.log("true here!");
  return true;
}