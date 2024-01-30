import {SCHEMA_TYPE} from "../../schemas/SchemaTypes"
import {$full_join, $left_join, $left_join_multi_fields} from "../../server_base/database-functions/ViewUtils"
import {IViewDefinition} from "../../share/types/IViewDefinition"
import {BASIC_TYPE} from "../../share/types/DataTypes";

export const ProjectMemberView: IViewDefinition = {
    schema: {
        user: {type: SCHEMA_TYPE.USER},
        isTester: {type: BASIC_TYPE.BOOLEAN},
        isReviewer: {type: BASIC_TYPE.BOOLEAN},
        isDefectHunter: {type: BASIC_TYPE.BOOLEAN},
        blacklistID: {type: SCHEMA_TYPE.PROJECT_MEMBER_BLACKLIST, hidden: true}
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
                    $addToSet: "$testcase.assigned_tester",
                },
                reviewers: {
                    $addToSet: "$testcase.reviewer",
                },
                a_reviewers: {
                    $addToSet: "$testcase.assigned_reviewer",
                },
            },
        },
        // {
        //     $project: {
        //         ttv2_members: {
        //             $concatArrays: [
        //                 "$testers",
        //                 "$reviewers",
        //                 "$a_testers",
        //                 "$a_reviewers",
        //             ],
        //         },
        //     },
        // },
        // {
        //     $set: {
        //         ttv2_members: {
        //             $setUnion: "$ttv2_members",
        //         },
        //     },
        // },
        $left_join(SCHEMA_TYPE.PLM_CODE, "_id", "testProject", "plm"),
        $left_join(SCHEMA_TYPE.PLM_DEFECT, "plm", "plm_code", "defect", true),
        {
            $group: {
                _id: "$_id",
                // ttv2_testers: {
                //     $first: "$ttv2_members",
                // },
                testers: {$first: "$testers"},
                a_testers: {$first: "$a_testers"},
                reviewers: {$first: "$reviewers"},
                a_reviewers: {$first: "$a_reviewers"},
                plm_hunters: {
                    $addToSet: "$defect.user_submit",
                },
            },
        },
        // {
        //     $project: {
        //         _id: 1,
        //         user: {
        //             $concatArrays: [
        //                 "$ttv2_testers",
        //                 "$plm_hunters",
        //             ],
        //         },
        //     },
        // },
        // {
        //     $set: {
        //         member: {
        //             $setUnion: "$user",
        //         },
        //     },
        // },
        // {
        //     $unwind: {
        //         path: `$user`,
        //         preserveNullAndEmptyArrays: false,
        //     },
        // },
        $full_join(SCHEMA_TYPE.USER, "user"),
        $left_join_multi_fields(SCHEMA_TYPE.PROJECT_MEMBER_BLACKLIST, ["_id", "user"], ["testProject", "user"], "blacklistID"),
        {
            $addFields: {
                isTester: {
                    $cond: {
                        if: {$or: [{$in: ["$user", "$testers"]}, {$in: ["$user", "$a_testers"]}]},
                        then: true,
                        else: false
                    }
                },
                isReviewer: {
                    $cond: {
                        if: {$or: [{$in: ["$user", "$reviewers"]}, {$in: ["$user", "$a_reviewers"]}]},
                        then: true,
                        else: false
                    }
                },
                isDefectHunter: {
                    $cond: {
                        if: {$in: ["$user", "$plm_hunters"]},
                        then: true,
                        else: false
                    }
                },
            }
        },
        {
            $project: {
                testers: 0,
                a_testers: 0,
                reviewers: 0,
                a_reviewers: 0,
                plm_hunters: 0,
            }
        },
        {
            $match: {
                $or: [
                    {isTester: true},
                    {isReviewer: true},
                    {isDefectHunter: true},
                ]
            }
        }
    ]
}
