import { ISchemaDefinition } from "../../share/types/ISchemaDefinition";
import { BASIC_TYPE } from "../../share/types/DataTypes";
import {SCHEMA_TYPE} from "../SchemaTypes";

export const PLMDefectSchema: ISchemaDefinition = {
  plm_code: {
    type: SCHEMA_TYPE.PLM_CODE,
    label: "Dev. Mdl. Name/Item Name",
  },
  case_code: {
    type: BASIC_TYPE.TEXT,
    required: true,
    importKey: true,
    unique: true,
    label: "Case Code",
  },
  plm_link: {
    type: BASIC_TYPE.TEXT,
    hidden: true,
    label: "Case Code_hyperlink",
  },
  title: {
    type: BASIC_TYPE.TEXT,
    required: true,
  },
  priority: {
    type: BASIC_TYPE.ENUM,
    enum: ["A", "B", "C"],
    required: true,
    label: "Priority",
  },
  register_by: {
    type: BASIC_TYPE.TEXT,
    label: "Reg. by",
    immutable: true,
  },
  user_submit: {
    type: SCHEMA_TYPE.USER,
    nullable: true,
    label: "Register E-Mail",
    hint: "Null if not submitted by system's user",
  },
  testcase_id: {
    type: BASIC_TYPE.TEXT,
    label: "Test Case ID",
  },
  cl_number: {
    type: BASIC_TYPE.TEXT,
    label: "CL Number",
  },
  problem_status: {
    type: BASIC_TYPE.ENUM,
    enum: ["Open", "Resolve", "Close", "Delete"],
    label: "Progr.Stat.",
  },
  resolution_type: {
    type: BASIC_TYPE.TEXT,
    label: "Resolution Type",
  },
  defect_type: {
    type: BASIC_TYPE.TEXT,
  },
  rej_reason: {
    type: BASIC_TYPE.TEXT,
    label: "Rej. Reason",
  },
  defect_class: {
    type: BASIC_TYPE.TEXT,
  },
  registered_date: {
    type: BASIC_TYPE.DATE,
    label: "Registered Date",
  },
  resolve_date: {
    type: BASIC_TYPE.DATE,
    nullable: true,
    label: "Resolve Date",
  },
};
