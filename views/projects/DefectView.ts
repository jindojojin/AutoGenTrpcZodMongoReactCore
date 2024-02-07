import {IViewDefinition} from "../../share/types/IViewDefinition";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {$inner_join} from "../../server_base/database-functions/ViewUtils";
import {BASIC_TYPE} from "../../share/types/DataTypes";

export const DefectView: IViewDefinition = {
    viewOn: SCHEMA_TYPE.PLM_DEFECT,
    schema: {
        testproject: {type: SCHEMA_TYPE.TEST_PROJECT},
        plm_code: {type: SCHEMA_TYPE.PLM_CODE},
        case_code: {type: BASIC_TYPE.TEXT},
        plm_link: {type: BASIC_TYPE.TEXT},
        cl_number: {type: BASIC_TYPE.TEXT},
        title: {type: BASIC_TYPE.TEXT},
        reg_email: {type: BASIC_TYPE.TEXT},
        reg_dept: {type: BASIC_TYPE.TEXT},
        reg_time: {type: BASIC_TYPE.DATE_TIME},
        problem_status: {
            type: BASIC_TYPE.ENUM,
            enum: ["Open", "Resolve", "Close", "Delete"],
        },
        class: {type: BASIC_TYPE.ENUM, enum: ["DEFECT", "NOT_DEFECT", "PENDING"]}
    },
    pineline: [
        $inner_join(SCHEMA_TYPE.PLM_CODE, "plm_code", "_id", "code", true),
        $inner_join(SCHEMA_TYPE.TEST_PROJECT, "code.testProject", "_id", "testproject"),
        {
            $addFields: {
                splitArray: {$split: ["$register_by", "/-/"]},
                class: {
                    $cond: {
                        if: {$eq: ["$problem_status", "Open"]},
                        then: "PENDING",
                        else: {
                            $cond: {
                                if: {$in: ["$resolution_type", ["Withdrawn by internal staff", "Duplicated issue"]]},
                                then: "NOT_DEFECT",
                                else: "DEFECT"
                            }
                        }
                    }
                }
            }
        },
        {
            $project: {
                testproject: 1,
                plm_code: 1,
                case_code: 1,
                plm_link: 1,
                cl_number: 1,
                reg_email: 1,
                reg_dept: {$arrayElemAt: ["$splitArray", 1]},
                reg_time: 1,
                problem_status: 1,
                title: 1,
                class: 1
            }
        }

    ]
}
