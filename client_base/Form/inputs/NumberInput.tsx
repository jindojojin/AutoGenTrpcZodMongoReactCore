import React from "react";
import { InputNumber } from "antd/lib";
import { FormInputProps } from "./Types";

function NumberInput(props: FormInputProps<number>) {
  return <InputNumber {...props} style={{ flex: 1, width:"100%" }} />;
}

export default NumberInput;