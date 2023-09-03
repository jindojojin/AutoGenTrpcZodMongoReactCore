import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import { BASIC_TYPE } from "../../share/types/DataTypes";
import {SCHEMA_TYPE} from "../SchemaTypes";

export const AssetSchema: ISchemaDefinition = {
  invoice: {
    type: SCHEMA_TYPE.ASSET_INVOICE,
    nullable: true,
  },
  quantity: {
    type: BASIC_TYPE.NUMBER,
    default: 1,
  },
};
