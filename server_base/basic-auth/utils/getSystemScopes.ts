import { ScopeModel } from "../../mongoose/DatabaseModels";
import { getRawScopes } from "../../../share/ScopeUtils";
import { NODE_CACHE } from "../../CacheManager";
import _ from "lodash";

// ScopeModel.watch().on("change", (_data) => {
//   //TODO: Hàm này phat hien thay doi trong bang scope de xoa cache -> chua check
//   NODE_CACHE.del("SYSTEM_SCOPES");
// });

export async function getSystemScopes() {
  if (NODE_CACHE.has("SYSTEM_SCOPES")) {
    return NODE_CACHE.get<string[]>("SYSTEM_SCOPES") as string[];
  } else {
    const scopeList = await ScopeModel.find().lean();
    let result: string[] = [];
    if (scopeList) {
      const scope_arr = scopeList.map((e) => getRawScopes(e as any));
      result = _.chain(scope_arr).flattenDeep().compact().uniq().value();
    }
    NODE_CACHE.set<string[]>("SYSTEM_SCOPES", result, "5m");
    return result;
  }
}
