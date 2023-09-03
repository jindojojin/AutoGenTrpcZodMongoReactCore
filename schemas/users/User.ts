import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {SystemUserSchema} from "../../server_base/basic-auth/AuthSchemas";
import {BASIC_TYPE, FILE_TYPE} from "../../share/types/DataTypes";

export const UserSchema: ISchemaDefinition = {
  ...SystemUserSchema,
  avatar: {
    type: FILE_TYPE.IMAGE,
    label: "Ảnh đại diện",
  },
  fullName: {
    type: BASIC_TYPE.TEXT,
    exportKey: true,
    text: true,
    label: "Tên đầy đủ",
  },
  emailAddress: {
    type: BASIC_TYPE.TEXT,
    label: "Email",
    importKey: true,
    exportKey: true,
  },
  birthday: { type: BASIC_TYPE.DATE, label: "Ngày sinh" },
  phoneNumber: { type: BASIC_TYPE.TEXT, label: "Số điện thoại" },
};
