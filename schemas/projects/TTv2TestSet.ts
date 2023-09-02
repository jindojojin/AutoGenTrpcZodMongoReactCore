import { BASIC_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";
import { ISchemaDefinition } from "../../types/ISchemaDefinition";

export const TTv2TestSetSchema: ISchemaDefinition = {
  tpid: { type: SCHEMA_TYPE.TTV2_TEST_SUITE, hidden: true },
  id: {
    type: BASIC_TYPE.NUMBER,
    required: true,
    unique: true,
    importKey: true,
    label: "Set ID",
  },
  category: { type: BASIC_TYPE.TEXT },
  title: { type: BASIC_TYPE.TEXT },
  state: { type: BASIC_TYPE.NUMBER, hidden: true },
  syncFlag: { type: BASIC_TYPE.BOOLEAN },
};
