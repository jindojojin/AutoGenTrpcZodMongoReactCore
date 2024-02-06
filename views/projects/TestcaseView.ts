import {IViewDefinition} from "../../share/types/IViewDefinition";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {BASIC_TYPE} from "../../share/types/DataTypes";
import {TTV2_TC_STATES} from "../../share/constants/share_constants";
import {$isNotNull} from "../../share/MongoDBUtils";
import {$inner_join} from "../../server_base/database-functions/ViewUtils";

export const TestcaseView: IViewDefinition = {
    schema: {
        testproject: {type: SCHEMA_TYPE.TEST_PROJECT, hidden: true},
        testsuite: {type: SCHEMA_TYPE.TTV2_TEST_SUITE, hidden: true},
        testset: {type: SCHEMA_TYPE.TTV2_TEST_SET, hidden: true},
        tcid: {type: BASIC_TYPE.NUMBER},
        title: {type: BASIC_TYPE.TEXT},
        tester: {type: BASIC_TYPE.TEXT},
        reviewer: {type: BASIC_TYPE.TEXT},
        division_test: {type: BASIC_TYPE.TEXT},
        division_review: {type: BASIC_TYPE.TEXT},
        // u_test: {type: SCHEMA_TYPE.USER, label: "Tester"},
        // u_review: {type: SCHEMA_TYPE.USER, label: "Reviewer"},
        state: {type: BASIC_TYPE.ENUM, enum: TTV2_TC_STATES},
        due_test: {type: BASIC_TYPE.DATE_TIME},
        due_review: {type: BASIC_TYPE.DATE_TIME}
    },
    viewOn: SCHEMA_TYPE.TTV2_TESTCASE,
    pineline: [
        {
            $match: {
                tcid: $isNotNull
            }
        },

        $inner_join(SCHEMA_TYPE.TTV2_TEST_SET, "top", "_id", "testset", true),
        $inner_join(SCHEMA_TYPE.TTV2_TEST_SUITE, "testset.tpid", "_id", "testsuite", true),
        $inner_join(SCHEMA_TYPE.TEST_PROJECT, "testsuite.testProject", "_id", "testproject"),
        {
            $set: {
                tester: {$ifNull: ["$tester", "$assigned_tester"]},
                reviewer: {$ifNull: ["$reviewer", "$assigned_reviewer"]},
                testset: "$testset._id",
                testsuite: "$testsuite._id"
            }
        },
        $inner_join(SCHEMA_TYPE.TTV2_USER, "tester", "id", "tester", true),
        $inner_join(SCHEMA_TYPE.TTV2_USER, "reviewer", "id", "reviewer", true),
        {
            $project: {
                testproject: 1,
                testsuite: 1,
                testset: 1,
                tcid: 1,
                title: 1,
                tester: "$tester.username",
                reviewer: "$reviewer.username",
                division_test: "$tester.division",
                division_review: "$reviewer.division",
                u_test: 1,
                u_review: 1,
                state: 1,
                due_test: 1,
                due_review: 1
            }
        }
    ]
}
