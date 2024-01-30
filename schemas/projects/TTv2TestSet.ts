import {BASIC_TYPE} from "../../share/types/DataTypes";
import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";

import {TTV2_STATES} from "../../share/constants/share_constants";

export const TTv2TestSetSchema: ISchemaDefinition = {
  tpid: { type: SCHEMA_TYPE.TTV2_TEST_SUITE, hidden: true },
  id: {
    type: BASIC_TYPE.NUMBER,
    required: true,
    unique: true,
    importKey: true,
    label: "Set ID",
  },
  category: {type: BASIC_TYPE.TEXT},
  title: {type: BASIC_TYPE.TEXT},
  state: {type: BASIC_TYPE.ENUM, enum: TTV2_STATES.slice(-2), hidden: true},
  schedule: {type: BASIC_TYPE.DATE_RANGE},
  syncFlag: {type: BASIC_TYPE.BOOLEAN},
};
