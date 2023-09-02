import {
  ADMIN_SCOPE,
  getRawScopes,
} from "../../ScopeUtils";
import {
  UserModel,
  UserScopeModel,
} from "../../../mongoose/DatabaseModels";
import _ from "lodash";
import { AUTH_USER_ID_FIELD } from "../../../constants/database_fields";
import { Scope } from "../../../types/DatabaseTypes";
import {getObjectKeys} from "../../genUtils";

function getCombineUserGroupsScopes(userScopes: (any & Scope)[]) {
  return _.chain(userScopes)
    .flattenDeep()
    .map((s: any) => getRawScopes(s))
    .uniq()
    .compact()
    .value() as unknown as string[];
}

//TODO: Memo user scope at server to recheck scope in token

export async function getUserScopes(loginID: string) {
  const user = await UserModel.findOne({
    [AUTH_USER_ID_FIELD]: loginID,
  }).lean();
  if (!user) throw new Error("User's loginID not exist!");
  else {
    const userScopeList = await UserScopeModel.find({}, undefined, {
      flattenObjectIds: true,
      flattenMaps: true,
      populate: "scopes",
    }).lean();
    const GroupMap = userScopeList
      ? _.keyBy(userScopeList, (ug) => ug._id.toString())
      : {};
    let userGroups: any[] = getObjectKeys(GroupMap).filter((gr_id) =>
      _.some(
        GroupMap[gr_id]?.members,
        (memID) => String(memID) == String(user._id),
      ),
    );

    let topGroups: any[] = userGroups.reduce((prev, gr_id) => {
      return [...prev, GroupMap[gr_id]?.top as string];
    }, [] as any[]);

    let scopesFromGroup = getCombineUserGroupsScopes(
      _.compact([...userGroups, ...topGroups]).map(
        (_id) => GroupMap[_id].scopes,
      ),
    );
    console.log("Scopes from group", scopesFromGroup);
    const specialScopes = [];
    if ((process.env.SYSTEM_ADMIN ?? "").split(",").includes(loginID)) {
      specialScopes.push(ADMIN_SCOPE);
    }
    return [...scopesFromGroup, ...specialScopes];
  }
}
