import React from "react";
import { Select } from "antd";
import { FormInputProps } from "./Types";

function EnumInput(props: FormInputProps<string>) {
  return (
    <Select
      {...props}
      options={props.fieldConfig?.enum?.map((e: string, i: number) => ({
        value: e,
        label: props.fieldConfig?.enumLabel?.[i] ?? e,
      }))}
    />
  );
}

export default EnumInput;