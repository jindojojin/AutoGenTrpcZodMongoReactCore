import {ISchemaFieldConfig} from "../../../types/ISchemaDefinition";

export type FormInputProps<T extends any = any> = any & {
  value?: T | null;
  onChange?: (v?: T | null) => void;
  disabled?: boolean;
  fieldConfig?: ISchemaFieldConfig;
};

export type FormMultiInputProps<T extends any = any> = any & {
  value?: T[];
  onChange?: (v?: T[]) => void;
  disabled?: boolean;
  fieldConfig?: ISchemaFieldConfig;
};