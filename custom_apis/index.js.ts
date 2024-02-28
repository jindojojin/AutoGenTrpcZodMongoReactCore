import {TABLE_API} from "./TableAPI";
import {TTv2ProgressByMember} from "./projects/TTv2ProgressByMember";
import {TableApiDefinition} from "../share/types/IViewDefinition";


export type TableAPIGenConfig = {
    config: TableApiDefinition,
    folder?: string
}
export const TableAPIGen: Record<TABLE_API, TableAPIGenConfig> = {
    [TABLE_API.TTV2_PROGRESS_BY_MEMBER]: {
        config: TTv2ProgressByMember,
        folder: "projects"
    }
}
