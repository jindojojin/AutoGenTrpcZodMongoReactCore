import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import {
    $inner_join,
    $left_join_multi_fields,
} from "../../server_base/database-functions/ViewUtils";
import { TTV2_STATES } from "../../share/constants/share_constants";
import { BASIC_TYPE } from "../../share/types/DataTypes";
import { IViewDefinition } from "../../share/types/IViewDefinition";

export const TestCaseByMemberView: IViewDefinition = {
    schema: {
        tester: { type: SCHEMA_TYPE.USER },
        testset: { type: SCHEMA_TYPE.TTV2_TEST_SET, hidden: true },
        testproject: { type: SCHEMA_TYPE.TEST_PROJECT, hidden: true },
        DONE: { type: BASIC_TYPE.NUMBER },
        PASSED: { type: BASIC_TYPE.NUMBER },
        SUM: { type: BASIC_TYPE.NUMBER },
        PROGRESS: { type: BASIC_TYPE.NUMBER },
        EXPECTED_PROGRESS: { type: BASIC_TYPE.NUMBER },
    },
    viewOn: SCHEMA_TYPE.TEST_PROJECT,
    pineline: [
        $inner_join(SCHEMA_TYPE.TTV2_TEST_SUITE, "_id", "testProject", "testsuite"),
        $inner_join(
            SCHEMA_TYPE.TTV2_TEST_SET,
            "testsuite",
            "tpid",
            "testset",
            true,
        ),
        {
            $set: {
                schedule: "$testset.schedule",
                testset: "$testset._id",
            },
        },
        $inner_join(SCHEMA_TYPE.TTV2_TESTCASE, "testset", "top", "testcase", true),
        {
            $addFields: {
                tester: { $ifNull: ["$testcase.tester", "$testcase.assigned_tester"] },
            },
        },
        $left_join_multi_fields(
            SCHEMA_TYPE.PROJECT_MEMBER_BLACKLIST,
            ["tester", "_id"],
            ["user", "testProject"],
            "isExclude",
        ),
        {
            $match: {
                tester: { $ne: null },
                isExclude: { $eq: null },
            },
        },
        {
            $group: {
                _id: {
                    tester: "$tester",
                    testset: "$testset",
                },
                tester: { $first: "$tester" },
                testset: { $first: "$testset" },
                schedule: { $first: "$schedule" },
                testproject: { $first: "$_id" },
                ...TTV2_STATES.slice(0, -2).reduce(
                    (prev, state) => ({
                        ...prev,
                        [state]: {
                            $sum: {
                                $cond: {
                                    if: { $eq: [state, "$testcase.state"] },
                                    then: 1,
                                    else: 0,
                                },
                            },
                        },
                    }),
                    {},
                ),
            },
        },
        { $set: { testset: { $toString: "$testset" } } },
    ],
};
