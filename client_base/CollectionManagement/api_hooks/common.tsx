import _ from "lodash";
import { DATABASE_APIS } from "../../../share/constants/database_apis";
import { DYNAMIC_CATEGORY_ID } from "../../../share/constants/database_fields";
import { SCHEMAS_CONFIG } from "../../../share/schema_configs";
import { APIConfigs } from "../configs/CommonConfig";

export function useDepopulate<T>(config: APIConfigs) {
  return (v: any) => {
    const relationKeys = SCHEMAS_CONFIG[config.schema].relationKeys;
    relationKeys.forEach(
      (key) =>
        (v[key] = Array.isArray(v[key])
          ? (v[key] as any[]).map((o) => o._id ?? o)
          : (v[key] as any)?._id ?? v[key] ?? undefined)
    );
    return { ...v } as T;
  };
}

export function useFixedData(config: APIConfigs) {
  return _.merge(
    config?.fixedInfo ?? {},
    config.dynamic ? { [DYNAMIC_CATEGORY_ID]: config.dynamic.categoryId } : {}
  );
}

export function useFixedQuery(config: APIConfigs) {
  const queries = [];
  if (config.fixedQuery) queries.push(config.fixedQuery);
  if (config.fixedInfo) queries.push(config.fixedInfo);
  if (config.dynamic)
    queries.push({ [DYNAMIC_CATEGORY_ID]: config.dynamic.categoryId });
  console.log("New fixed Query", queries);
  return queries;
}

export function useApiInput(config: APIConfigs) {
  return (input: any) => {
    if (config.dynamic) {
      return {
        [DYNAMIC_CATEGORY_ID]: config.dynamic.categoryId,
        input,
      };
    } else return input;
  };
}

export function useApiRoute(config: APIConfigs) {
  return DATABASE_APIS[config.schema];
}