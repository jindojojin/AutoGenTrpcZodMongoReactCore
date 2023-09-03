import { BASIC_TYPE, SCHEMA_TYPE } from "../../share/types/DataTypes";
import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";

export const TTv2TestSuiteSchema: ISchemaDefinition = {
  testProject: { type: SCHEMA_TYPE.TEST_PROJECT, hidden: true },
  id: {
    type: BASIC_TYPE.NUMBER,
    required: true,
    unique: true,
    importKey: true,
    label: "Suite ID",
  },
  name: { type: BASIC_TYPE.TEXT },
  iplan_start: { type: BASIC_TYPE.DATE, nullable: true },
  iplan_end: { type: BASIC_TYPE.DATE, nullable: true },
  mplan_start: { type: BASIC_TYPE.DATE, nullable: true },
  mplan_end: { type: BASIC_TYPE.DATE, nullable: true },
  iplan_ga: { type: BASIC_TYPE.DATE, nullable: true },
  mplan_ga: { type: BASIC_TYPE.DATE, nullable: true },
  lastSync: { type: BASIC_TYPE.DATE },
};
