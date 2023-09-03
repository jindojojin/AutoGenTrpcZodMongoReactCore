import { Types } from "mongoose";
import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";
import {BASIC_TYPE} from "../../share/types/DataTypes";


export const RecordStackHoldersSchema: ISchemaDefinition = {
  record: {
    type: SCHEMA_TYPE.HO_SO,
    required: true,
  },
  pic: {
    type: SCHEMA_TYPE.USER,
    required: true,
  },
  quantity: {
    type: BASIC_TYPE.NUMBER,
    default: 1,
    required: true,
  },
};
