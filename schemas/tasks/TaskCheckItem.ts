import { ISchemaDefinition } from "../../types/ISchemaDefinition";

import { BASIC_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";

export const TaskCheckItemSchema: ISchemaDefinition = {
  task: {
    type: SCHEMA_TYPE.TASK,
    required: true,
  },
  description: {
    type: BASIC_TYPE.TEXT,
    required: true,
    label: "Todo",
  },
  pic: {
    type: SCHEMA_TYPE.USER,
  },
  reviewer: {
    type: SCHEMA_TYPE.USER,
  },
  finishTime: {
    type: BASIC_TYPE.TIME,
  },
  reviewTime: {
    type: BASIC_TYPE.TIME,
  },
  result: { type: BASIC_TYPE.TEXT, enum: ["PASS", "FAIL"] },
  score: { type: BASIC_TYPE.NUMBER, min: 0, max: 5 },
  comment: {
    type: BASIC_TYPE.TEXT,
  },
};
