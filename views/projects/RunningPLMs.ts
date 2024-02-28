import {IViewDefinition} from "../../share/types/IViewDefinition";
import {BASIC_TYPE} from "../../share/types/DataTypes";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {$left_join} from "../../server_base/database-functions/ViewUtils";

export const RunningPLMs: IViewDefinition = {
    schema: {code: {type: BASIC_TYPE.TEXT}},
    viewOn: SCHEMA_TYPE.TEST_PROJECT,
    pineline: [
        {
            $match: {"schedule.start": {$lte: new Date()}, "schedule.end": {$gte: new Date()}}
        },
        $left_join(SCHEMA_TYPE.PLM_CODE, "_id", "testProject", "plm", true),
        {
            $set: {
                code: "$plm.plmCode"
            }
        },
        {$match: {code: {$ne: null}}},
        {
            $project: {
                code: 1
            }
        }
    ]
}
