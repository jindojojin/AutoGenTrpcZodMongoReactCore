import { ISchemaDefinition } from "../../types/ISchemaDefinition";
import { BASIC_TYPE, FILE_TYPE } from "../../types/DataTypes";

export const ProjectSchema: ISchemaDefinition = {
  logo: {
    type: FILE_TYPE.IMAGE,
  },
  name: {
    type: BASIC_TYPE.TEXT,
    unique: true,
    required: true,
    searchKey: true,
    exportKey: true,
    importKey: true,
  },
  alias_1: {
    type: BASIC_TYPE.TEXT,
    unique: true,
    searchKey: true,
  },
  alias_2: {
    type: BASIC_TYPE.TEXT,
    unique: true,
    searchKey: true,
  },
  alias_3: {
    type: BASIC_TYPE.TEXT,
    unique: true,
    searchKey: true,
  },
};
