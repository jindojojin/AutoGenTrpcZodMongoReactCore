import { APICallbacks, APIConfigs } from "./CommonConfig";
import { FieldValues } from "react-hook-form";

export type FormConfigProps<T extends FieldValues> = {
  beforeSubmit?: (v: Partial<T>) => T;
  callbacks?: Partial<Record<FORM_ACTION, APICallbacks<any, any>>>;
  usages?: Partial<Record<FORM_ACTION, boolean>>;
  api: APIConfigs<T>;
};

export enum FORM_ACTION {
  CREATE = "Create",
  DELETE = "Delete",
  UPDATE = "Update",
}