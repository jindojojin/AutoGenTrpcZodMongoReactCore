import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";
import {BASIC_TYPE} from "../../share/types/DataTypes";

export const AssetStorageSchema: ISchemaDefinition = {
    asset: {
        type: SCHEMA_TYPE.ASSET,
        required: true
    },
    quantity: {
        type: BASIC_TYPE.NUMBER,
    },
    in_out_log: {
        type: [BASIC_TYPE.UNKNOWN]
    }
};