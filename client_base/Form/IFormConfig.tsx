import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormStateReturn,
} from "react-hook-form";
import { ReactElement } from "react";

export type ItemRenderProps<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> = {
  field: ControllerRenderProps<T, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
  watchValue: PathValue<T, TName>[] | undefined;
};
export interface IFormItemConfig<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> {
  label?: string;
  key: TName;
  required?: boolean;
  render: (props: ItemRenderProps<T, TName>) => ReactElement;
  hint?: string;
}

export default interface IFormConfig<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> {
  label?: string;
  watch?: TName[];
  formItems: IFormItemConfig<T, TName>[];
}