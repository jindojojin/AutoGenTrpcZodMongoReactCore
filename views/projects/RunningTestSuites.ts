import {IViewDefinition} from "../../share/types/IViewDefinition";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {$left_join} from "../../server_base/database-functions/ViewUtils";
import {BASIC_TYPE} from "../../share/types/DataTypes";

export const RunningTestSuites: IViewDefinition = {
    schema: {id: {type: BASIC_TYPE.NUMBER}},
    viewOn: SCHEMA_TYPE.TEST_PROJECT,
    pineline: [
        {
            $match: {"schedule.start": {$lte: new Date()}, "schedule.end": {$gte: new Date()}}
        },
        $left_join(SCHEMA_TYPE.TTV2_TEST_SUITE, "_id", "testProject", "testsuite", true),
        {
            $set: {
                id: "$testsuite.id"
            }
        },
        {$match: {id: {$ne: null}}},
        {
            $project: {
                id: 1
            }
        }
    ]
}
