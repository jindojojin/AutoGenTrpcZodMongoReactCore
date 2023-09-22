import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {SCHEMA_TYPE} from "../SchemaTypes";
import {BASIC_TYPE} from "../../share/types/DataTypes";

export const AssetTransferSchema: ISchemaDefinition = {
    fromLocation: {
        type: BASIC_TYPE.TEXT,
        hint: "Luu id cua AssetStorage or AssetPic",
        hidden: true,
        required: true
    },
    transferType: {
        type: BASIC_TYPE.ENUM,
        enum: ["Return to the storage", "Change PIC", "Assign to PIC"],
        required: true,
    },
    asset: {
        type: SCHEMA_TYPE.ASSET,
        required: true
    },
    fromPIC: {
        type: SCHEMA_TYPE.USER,
        nullable: true,
    },
    toPIC: {
        type: SCHEMA_TYPE.USER,
        nullable: true
    },
    quantity: {
        type: BASIC_TYPE.NUMBER,
        label: "OK",
        required: true
    },
    quantityNOK: {
        type: BASIC_TYPE.NUMBER,
        required: true,
        label: "NOK"
    },
    status: {
        type: BASIC_TYPE.ENUM,
        enum: ["REQUESTED", "ACCEPTED", "REJECTED"]
    }
}