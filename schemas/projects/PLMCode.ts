import { BASIC_TYPE } from "../../share/types/DataTypes";
import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";

export const PLMCodeSchema: ISchemaDefinition = {
  testProject: { type: SCHEMA_TYPE.TEST_PROJECT, hidden: true },
  plmCode: {
    type: BASIC_TYPE.TEXT,
    unique: true,
    importKey: true,
    required: true,
    label: "Dev. Mdl. Name/Item Name",
  },
  note: { type: BASIC_TYPE.TEXT },
  lastSync: { type: BASIC_TYPE.DATE },
};
