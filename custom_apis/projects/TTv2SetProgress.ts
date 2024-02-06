import {TableApiDefinition} from "../../share/types/IViewDefinition";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {$match_test_project, $match_testset} from "./CommonPinelines";
import {$inner_join} from "../../server_base/database-functions/ViewUtils";

export const TTv2SetProgress: TableApiDefinition = {
    parameters: {
        testproject: {type: SCHEMA_TYPE.TEST_PROJECT},
    },
    viewOn: SCHEMA_TYPE.TEST_PROJECT,
    schema: {},
    pineline: (testproject: string) => [
        $match_test_project(testproject),
        $match_testset([]),
        $inner_join(
            SCHEMA_TYPE.TTV2_TESTCASE,
            "testset._id",
            "top",
            "testcase",
            true,
        ),

    ]
}
