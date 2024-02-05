import {IViewDefinition} from "../share/types/IViewDefinition";
import {VIEW_TYPE} from "./ViewTypes";
import {ProjectMemberView} from "./projects/ProjectMemberView";
import {TestCaseByMemberView} from "./projects/TestCaseByMember";
import {VIEW_FUNC} from "../server_base/database-functions";

export type ViewGenConfig = {
    view: IViewDefinition,
    folder?: string,
    excludeFunctions?: (keyof typeof VIEW_FUNC)[]
}
export const ViewGenList: Record<VIEW_TYPE, ViewGenConfig> = {
    [VIEW_TYPE.TEST_PROJECT_MEMBERS_VIEW]: {view: ProjectMemberView, folder: "projects"},
    [VIEW_TYPE.TESTCASE_BY_MEMBER_VIEW]: {
        view: TestCaseByMemberView,
        folder: "projects",
        excludeFunctions: ["findMany"]
    }
}
