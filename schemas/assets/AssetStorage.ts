import {BASIC_TYPE} from "../../share/types/DataTypes";
import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";

export const AssetStorageSchema: ISchemaDefinition = {
    asset: {
        type: SCHEMA_TYPE.ASSET,
        required: true,
        importKey: true
    },
    quantity: {
        type: BASIC_TYPE.NUMBER,
        label: "OK",
        required: true
    },
    quantityNOK: {
        type: BASIC_TYPE.NUMBER,
        label: "NOK",
        required: true
    },
    remark: {
        type: BASIC_TYPE.TEXT,
    },
    area: {
        type: BASIC_TYPE.TEXT,
    },
    in_out_log: {
        type: [BASIC_TYPE.UNKNOWN]
    }
};