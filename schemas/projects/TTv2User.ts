import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {BASIC_TYPE} from "../../share/types/DataTypes";

export const TTv2UserSchema: ISchemaDefinition = {
    id: {type: BASIC_TYPE.NUMBER},
    username: {type: BASIC_TYPE.TEXT},
    realname: {type: BASIC_TYPE.TEXT},
    email: {type: BASIC_TYPE.TEXT},
    division:{type:BASIC_TYPE.TEXT},
}
