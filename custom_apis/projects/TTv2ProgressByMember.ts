import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { BASIC_TYPE } from "../../share/types/DataTypes";
import {
    $add_percent_value,
    $inner_join,
    $left_join_multi_fields,
} from "../../server_base/database-functions/ViewUtils";
import {
    TTV2_STATES,
    TTV2_TC_DONE,
    TTV2_TC_FOR_COUNT,
    TTV2_TC_PASSED,
} from "../../share/constants/share_constants";
import { ObjectId } from "mongodb";
import { TableApiDefinition } from "../../share/types/IViewDefinition";

export const TTv2ProgressByMember: TableApiDefinition = {
    parameters: {
        testsets: { type: [SCHEMA_TYPE.TTV2_TEST_SET] },
        testproject: { type: SCHEMA_TYPE.TEST_PROJECT },
    },
    schema: {
        tester: { type: SCHEMA_TYPE.USER },
        tc_done: { type: BASIC_TYPE.NUMBER },
        tc_pass: { type: BASIC_TYPE.NUMBER },
        tc_total: { type: BASIC_TYPE.NUMBER },
        pass_rate: { type: BASIC_TYPE.TEXT },
        progress: { type: BASIC_TYPE.TEXT },
        expected_progress: { type: BASIC_TYPE.TEXT },
    },
    viewOn: SCHEMA_TYPE.TEST_PROJECT,
    pineline: (testsets: string[], testproject: string) => [
        {
            $match: {
                _id: new ObjectId(testproject),
            },
        },
        $inner_join(SCHEMA_TYPE.TTV2_TEST_SUITE, "_id", "testProject", "testsuite"),
        $inner_join(
            SCHEMA_TYPE.TTV2_TEST_SET,
            "testsuite",
            "tpid",
            "testset",
            true,
        ),
        {
            $match: {
                "testset._id": { $in: testsets.map((ts) => new ObjectId(ts)) },
            },
        },
        $inner_join(
            SCHEMA_TYPE.TTV2_TESTCASE,
            "testset._id",
            "top",
            "testcase",
            true,
        ),
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
                _id: "$tester",
                tester: { $first: "$tester" },
                testset: { $first: "$testset" },
                deadline_start: {
                    $min: { $ifNull: ["$testset.schedule.start", "$schedule.start"] },
                },
                deadline_end: {
                    $max: { $ifNull: ["$testset.schedule.end", "$schedule.end"] },
                },
                schedule: { $first: "$schedule" },
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
        {
            $addFields: {
                tc_done: { $sum: TTV2_TC_DONE.map((s) => `$${s}`) },
                tc_pass: { $sum: TTV2_TC_PASSED.map((s) => `$${s}`) },
                tc_total: { $sum: TTV2_TC_FOR_COUNT.map((s) => `$${s}`) },
                day_count: {
                    $dateDiff: {
                        startDate: { $min: [new Date(), "$deadline_start"] },
                        endDate: { $min: [new Date(), "$deadline_end"] },
                        unit: "day",
                    },
                },
                day_total: {
                    $dateDiff: {
                        startDate: "$deadline_start",
                        endDate: "$deadline_end",
                        unit: "day",
                    },
                },
            },
        },
        $add_percent_value(
            ["day_count", "tc_pass", "tc_done"],
            ["day_total", "tc_done", "tc_total"],
            ["expected_progress", "pass_rate", "progress"],
        ),
    ],
};
