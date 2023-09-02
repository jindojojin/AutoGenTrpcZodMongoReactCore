import { ISchemaDefinition } from "../../types/ISchemaDefinition";
import { BASIC_TYPE, FILE_TYPE } from "../../types/DataTypes";

export const AssetInvoiceSchema: ISchemaDefinition = {
  file: {
    type: FILE_TYPE.FILE,
  },
  name: {
    type: BASIC_TYPE.TEXT,
    required: true,
  },
};
