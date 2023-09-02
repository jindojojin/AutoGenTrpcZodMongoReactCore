import { ISchemaDefinition } from "../../types/ISchemaDefinition";
import { BASIC_TYPE, FILE_TYPE } from "../../types/DataTypes";
import { SystemUserSchema } from "../../utils/basic-auth/AuthSchemas";

export const UserSchema: ISchemaDefinition = {
  ...SystemUserSchema,
  fullName: {
    type: BASIC_TYPE.TEXT,
    exportKey: true,
    searchKey: true,
  },
  employeeNumber: {
    type: BASIC_TYPE.TEXT,
    label: "Gen Number",
    searchKey: true,
  },
  epId: {
    type: BASIC_TYPE.TEXT,
    label: "Employee ID",
    immutable: true,
  },
  emailAddress: {
    type: BASIC_TYPE.TEXT,
    label: "Email",
    unique: true,
    exportKey: true,
    searchKey: true,
    immutable: true,
  },
  avatar: {
    type: FILE_TYPE.IMAGE,
    label: "Avatar",
  },
  ttv2ID: { type: BASIC_TYPE.NUMBER, label: "TTv2 ID", unique: true },
  nickName: { type: BASIC_TYPE.TEXT, nullable: true },
  birthday: { type: BASIC_TYPE.DATE },
  external: { type: BASIC_TYPE.BOOLEAN },
};
