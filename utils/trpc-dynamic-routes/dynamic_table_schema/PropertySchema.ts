import {
  ISchemaDefinition,
  ISchemaFieldConfig,
} from "../../../types/ISchemaDefinition";
import { BASIC_TYPE, FILE_TYPE } from "../../../types/DataTypes";

export const PropertySchema: ISchemaDefinition<ISchemaFieldConfig> = {
  label: {
    type: BASIC_TYPE.TEXT,
    required: true,
    max: 50,
  },
  type: {
    type: BASIC_TYPE.ENUM,
    enum: [...Object.values(BASIC_TYPE), ...Object.values(FILE_TYPE)],
    default: BASIC_TYPE.UNKNOWN,
  },
  enum: {
    type: [BASIC_TYPE.TEXT],
    nullable: true,
  },
  hint: { type: BASIC_TYPE.TEXT },
  required: { type: BASIC_TYPE.BOOLEAN, default: false },
  nullable: { type: BASIC_TYPE.BOOLEAN, default: false },
  importKey: { type: BASIC_TYPE.BOOLEAN, default: false },
  exportKey: { type: BASIC_TYPE.BOOLEAN, default: false },
  searchKey: { type: BASIC_TYPE.BOOLEAN, default: false },
  unique: { type: BASIC_TYPE.BOOLEAN },
  enumLabel: { type: [BASIC_TYPE.TEXT] },
  private: { type: BASIC_TYPE.BOOLEAN, private: true },
  min: { type: BASIC_TYPE.NUMBER },
  max: { type: BASIC_TYPE.NUMBER },
  default: { type: BASIC_TYPE.UNKNOWN },
  text: { type: BASIC_TYPE.BOOLEAN, private: true },
  orderIdx: { type: BASIC_TYPE.NUMBER },
  hidden: { type: BASIC_TYPE.BOOLEAN, hidden: true },
  immutable: { type: BASIC_TYPE.BOOLEAN, hidden: true },
};
