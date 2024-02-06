import {BASIC_TYPE} from "../../share/types/DataTypes";
import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";
import {TTV2_STATES, TTV2_TC_STATES} from "../../share/constants/share_constants";

export const TTv2TestCaseSchema: ISchemaDefinition = {
    id: {type: BASIC_TYPE.NUMBER, unique: true, importKey: true},
    top: {
        type: SCHEMA_TYPE.TTV2_TEST_SET,
        label: "Test Set",
    },
    pid: {type: SCHEMA_TYPE.TTV2_TESTCASE, label: "Folder", nullable: true},
    tcid: {type: BASIC_TYPE.NUMBER},
    title: {type: BASIC_TYPE.TEXT},
    state: {type: BASIC_TYPE.ENUM, enum: TTV2_TC_STATES, nullable:true},
    tester: {type: BASIC_TYPE.NUMBER, nullable: true},
    reviewer: {type: BASIC_TYPE.NUMBER, nullable: true},
    assigned_tester: {type: BASIC_TYPE.NUMBER, nullable: true},
    assigned_reviewer: {type: BASIC_TYPE.NUMBER, nullable: true},
    due_test: {type: BASIC_TYPE.DATE},
    due_review: {type: BASIC_TYPE.DATE},
};
