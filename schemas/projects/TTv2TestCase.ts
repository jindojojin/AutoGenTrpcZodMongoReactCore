import {
  BASIC_TYPE,
  SCHEMA_TYPE,
  TTV2_STATES,
} from "../../types/DataTypes";
import { ISchemaDefinition } from "../../types/ISchemaDefinition";

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
