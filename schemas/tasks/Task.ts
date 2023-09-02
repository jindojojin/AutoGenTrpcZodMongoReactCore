import { ISchemaDefinition } from "../../types/ISchemaDefinition";

import {
  BASIC_TYPE,
  FILE_TYPE,
  SCHEMA_TYPE,
} from "../../types/DataTypes";

export const TaskSchema: ISchemaDefinition = {
  status: {
    type: BASIC_TYPE.TEXT,
    required: true,
    enum: ["ASSIGNED", "ON-GOING", "REVIEW-OK", "REVIEW-NOK", "CLOSE"],
    default: "ASSIGNED",
  },
  assigner: {
    type: SCHEMA_TYPE.USER,
    required: true,
  },
  name: {
    type: BASIC_TYPE.TEXT,
    label: "Task name",
    required: true,
  },
  detail: {
    type: BASIC_TYPE.TEXT,
    label: "Detail task",
  },
  pic: {
    type: [SCHEMA_TYPE.USER],
    required: true,
  },
  supporter: {
    type: [SCHEMA_TYPE.USER],
  },
  reviewer: {
    type: [SCHEMA_TYPE.USER],
    required: true,
  },

  plan: {
    type: BASIC_TYPE.DATE_RANGE,
    required: true,
  },
  finishTime: {
    type: BASIC_TYPE.DATE,
    label: "Finish time",
  },
  reviewTime: {
    type: BASIC_TYPE.DATE,
    label: "Review time",
  },
  attachments: { type: [FILE_TYPE.FILE] },
};
