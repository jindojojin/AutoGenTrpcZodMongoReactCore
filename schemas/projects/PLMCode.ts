import { BASIC_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import { ISchemaDefinition } from "../../types/ISchemaDefinition";

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
