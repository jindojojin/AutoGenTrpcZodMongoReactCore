import { ISchemaDefinition } from "../../types/ISchemaDefinition";
import { BASIC_TYPE, SCHEMA_TYPE } from "../../types/DataTypes";

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
