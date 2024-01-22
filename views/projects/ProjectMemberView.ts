import { SCHEMA_TYPE } from "../../schemas/SchemaTypes"
import { $left_join } from "../../server_base/database-functions/ViewUtils"
import { IViewDefinition } from "../../share/types/IViewDefinition"

export const ProjectMemberView: IViewDefinition = {
    schema: {
        ttv2_testers: { type: [SCHEMA_TYPE.USER] },
        plm_hunters: { type: [SCHEMA_TYPE.USER] }
    },
    viewOn: SCHEMA_TYPE.TEST_PROJECT,
    pineline: [
        $left_join(SCHEMA_TYPE.TTV2_TEST_SUITE, "_id", "testProject", "testsuite"),
        $left_join(SCHEMA_TYPE.TTV2_TEST_SET, "testsuite", "tpid", "testset"),
        $left_join(SCHEMA_TYPE.TTV2_TESTCASE, "testset", "top", "testcase", true),
        {
            $group: {
                _id: "$_id",
                testers: {
                    $addToSet: "$testcase.tester",
                },
                a_testers: {
                    $addToSet: "$testcase.a_tester",
                },
                reviewers: {
                    $addToSet: "$testcase.reviewers",
                },
                a_reviewers: {
                    $addToSet: "$testcase.a_reviewers",
                },
            },
        },
        {
            $project: {
                ttv2_members: {
                    $concatArrays: [
                        "$testers",
                        "$reviewers",
                        "$a_testers",
                        "$a_reviewers",
                    ],
                },
            },
        },
        {
            $set: {
                ttv2_members: {
                    $setUnion: "$ttv2_members",
                },
            },
        },
        $left_join(SCHEMA_TYPE.PLM_CODE, "_id", "testProject", "plm"),
        $left_join(SCHEMA_TYPE.PLM_DEFECT, "plm", "plm", "plm_code", true),
        {
            $group: {
                _id: "$_id",
                ttv2_testers: {
                    $first: "$ttv2_members",
                },
                plm_hunters: {
                    $addToSet: "$defect.user_submit",
                },
            },
        },
    ]
}
