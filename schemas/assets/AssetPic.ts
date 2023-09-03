import { BASIC_TYPE } from "../../share/types/DataTypes";
import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";

export const AssetPicSchema: ISchemaDefinition = {
  asset: {
    type: SCHEMA_TYPE.ASSET,
    importKey: true,
    required: true,
  },
  pic: {
    type: SCHEMA_TYPE.USER,
    required: true,
    importKey: true,
  },
  status: {
    type: BASIC_TYPE.ENUM,
    enum: ["OK", "NOK"],
  },
  quantity: {
    type: BASIC_TYPE.NUMBER,
    default: 1,
    required: true,
  },
  projects: { type: [SCHEMA_TYPE.PROJECT] },
};
