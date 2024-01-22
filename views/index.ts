import { IViewDefinition } from "../share/types/IViewDefinition";
import { VIEW_TYPE } from "./ViewTypes";
import { ProjectMemberView } from "./projects/ProjectMemberView";

export type ViewGenConfig = {
    view: IViewDefinition,
    folder?: string
}

export const ViewGenList: Record<VIEW_TYPE, ViewGenConfig> = {
    [VIEW_TYPE.TEST_PROJECT_MEMBERS_VIEW]: { view: ProjectMemberView, folder:"projects" }
}