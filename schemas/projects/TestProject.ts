import { BASIC_TYPE } from "../../share/types/DataTypes";
import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";

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
