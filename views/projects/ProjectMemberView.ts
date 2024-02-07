import {SCHEMA_TYPE} from "../../schemas/SchemaTypes"
import {$full_join, $left_join, $left_join_multi_fields} from "../../server_base/database-functions/ViewUtils"
import {IViewDefinition} from "../../share/types/IViewDefinition"
import {BASIC_TYPE} from "../../share/types/DataTypes";
import {VIEW_TYPE} from "../ViewTypes";
import {AUTH_USER_ID_FIELD} from "../../share/constants/database_fields";

export const ProjectMemberView: IViewDefinition = {
    schema: {
        user: {type: SCHEMA_TYPE.USER},
        testproject: {type: SCHEMA_TYPE.TEST_PROJECT, hidden: true},
        isTester: {type: BASIC_TYPE.BOOLEAN},
        isReviewer: {type: BASIC_TYPE.BOOLEAN},
        isHunter: {type: BASIC_TYPE.BOOLEAN},
        blacklistID: {type: SCHEMA_TYPE.PROJECT_MEMBER_BLACKLIST, hidden: true}
    },
    viewOn: VIEW_TYPE.TESTCASE_VIEW,
    pineline: [
        {
            $group: {
                _id: "$testproject",
                testers: {$addToSet: "$tester"},
                reviewers: {$addToSet: "$reviewer"},
            }
        },
        // $left_join(VIEW_TYPE.DEFECT_VIEW, "_id", "testproject", "defect", true),
        // {
        //     $group: {
        //         _id: "$_id",
        //         testers: {$first: "$testers"},
        //         reviewers: {$first: "$reviewers"},
        //         hunters: {$addToSet: "$defect.reg_email"}
        //     }
        // },
        $full_join(SCHEMA_TYPE.USER, "user", true),
        {
            $addFields: {
                isTester: {$in: [`$user.${AUTH_USER_ID_FIELD}`, '$testers']},
                isReviewer: {$in: [`$user.${AUTH_USER_ID_FIELD}`, '$reviewers']},
                // isHunter: {$in: [`$user.emailAddress`, '$hunters']},
                testproject: "$_id",
            }
        },
        {
            $match: {
                $or: [
                    {isTester: true},
                    {isReviewer: true},
                    // {isHunter: true},
                ]
            }
        },
        $left_join_multi_fields(SCHEMA_TYPE.PROJECT_MEMBER_BLACKLIST, ["testproject", "user._id"], ["testProject", "user"], "blacklistID"),
        {
            $project: {
                _id: "$user._id",
                user: "$user._id",
                testproject: 1,
                isTester: 1,
                isReviewer: 1,
                // isHunter: 1,
                blacklistID: 1
            }
        },
    ]
}
