import {IViewDefinition} from "../share/types/IViewDefinition";
import {VIEW_TYPE} from "./ViewTypes";
import {ProjectMemberView} from "./projects/ProjectMemberView";
import {VIEW_FUNC} from "../server_base/database-functions";
import {RunningTestSuites} from "./projects/RunningTestSuites";
import {RunningPLMs} from "./projects/RunningPLMs";
import {TestcaseView} from "./projects/TestcaseView";

export type ViewGenConfig = {
    view: IViewDefinition,
    folder?: string,
    excludeFunctions?: (keyof typeof VIEW_FUNC)[]
}
export const ViewGenList: Record<VIEW_TYPE, ViewGenConfig> = {
    [VIEW_TYPE.TEST_PROJECT_MEMBERS_VIEW]: {view: ProjectMemberView, folder: "projects"},
    [VIEW_TYPE.RUNNING_TEST_SUITES]: {view: RunningTestSuites, folder: "projects"},
    [VIEW_TYPE.RUNNING_PLM]: {view: RunningPLMs, folder: "projects"},
    [VIEW_TYPE.TESTCASE_VIEW]:{view:TestcaseView, folder:"projects"}
}
