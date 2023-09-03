import React from "react";
import { Switch } from "antd";
import { FormInputProps } from "./Types";

function BooleanInput(props: FormInputProps<boolean>) {
  return (
    <Switch
      size={"medium"}
      {...props}
      checked={props.value}
      onChange={(v) => {
        props.onChange?.(v);
      }}
    />
  );
}

export default BooleanInput;