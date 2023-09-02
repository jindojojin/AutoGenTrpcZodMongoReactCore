import { BASIC_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import { ISchemaDefinition } from "../../types/ISchemaDefinition";

export const TestProjectSchema: ISchemaDefinition = {
  project: {
    type: SCHEMA_TYPE.PROJECT,
    required: true,
  },
  packageVersion: { type: BASIC_TYPE.TEXT, required: true },
  pa: { type: SCHEMA_TYPE.USER, required: true },
  note: { type: BASIC_TYPE.TEXT },
  schedule: { type: BASIC_TYPE.DATE_RANGE },
};
