import { BASIC_TYPE } from "../../share/types/DataTypes";
import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import { SCHEMA_TYPE } from "../SchemaTypes";

export const TTV2_STATES = [
  "READY",
  "SKIPPED",
  "TESTING",
  "PAUSE", // TODO cai nay doan vay :))
  "TEST_NOK",
  "TEST_OK",
  "REVIEWING", //TODO cai nay la doan vay :)),chua check lai
  "REVIEW_PAUSE", //TODO cai nay la doan vay :)),chua check lai
  "REVIEW_NOK", //TODO cai nay la doan vay :)),chua check lai
  "REVIEW_OK",
  "TEST_SUITE_RUNNING",
  "TEST_SUITE_STOPPED",
];

export const TTv2TestCaseSchema: ISchemaDefinition = {
  id: { type: BASIC_TYPE.NUMBER, unique: true, importKey: true },
  top: {
    type: SCHEMA_TYPE.TTV2_TEST_SET,
    label: "Test Set",
  },
  pid: { type: SCHEMA_TYPE.TTV2_TESTCASE, label: "Folder", nullable: true },
  tcid: { type: BASIC_TYPE.NUMBER },
  title: { type: BASIC_TYPE.TEXT },
  state: { type: BASIC_TYPE.ENUM, enum: TTV2_STATES },
  tester: { type: SCHEMA_TYPE.USER, nullable: true },
  reviewer: { type: SCHEMA_TYPE.USER, nullable: true },
  assigned_tester: { type: SCHEMA_TYPE.USER, nullable: true },
  assigned_reviewer: { type: SCHEMA_TYPE.USER, nullable: true },
  due_test: { type: BASIC_TYPE.DATE },
  due_review: { type: BASIC_TYPE.DATE },
};
