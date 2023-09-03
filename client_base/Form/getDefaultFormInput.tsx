import { ItemRenderProps } from "./IFormConfig";
import { FieldPath, FieldValues } from "react-hook-form";
import React from "react";
import {
  BASIC_TYPE,
  FILE_TYPE,
  isSchemaType,
  SCHEMA_TYPE,
} from "../../share/types/DataTypes";
import { ISchemaFieldConfig } from "../../share/types/ISchemaDefinition";
import {
  CustomFormInputs,
  CustomFormMultiInputs,
} from "../../../src/common/custom/form/inputs";
import { BaseFormInputs, BaseFormMultiInputs } from "./inputs";
import { FormInputProps, FormMultiInputProps } from "./inputs/Types";

export function getDefaultFormInput<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
>(fieldConfig: ISchemaFieldConfig, renderProps: ItemRenderProps<T, TName>) {
  let InputComponent:
    | React.ComponentType<FormInputProps | FormMultiInputProps>
    | undefined;
  if (isSchemaType(fieldConfig.type)) {
    InputComponent = Array.isArray(fieldConfig.type)
      ? CustomFormMultiInputs[fieldConfig.type[0] as SCHEMA_TYPE]
      : CustomFormInputs[fieldConfig.type as SCHEMA_TYPE];
  } else {
    InputComponent = Array.isArray(fieldConfig.type)
      ? BaseFormMultiInputs[fieldConfig.type[0] as BASIC_TYPE | FILE_TYPE]
      : BaseFormInputs[fieldConfig.type as BASIC_TYPE | FILE_TYPE];
  }

  return InputComponent ? (
    <InputComponent {...{ ...renderProps.field, fieldConfig }} />
  ) : (
    <></>
  );
}