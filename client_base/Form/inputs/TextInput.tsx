import React from "react";
import { Input } from "antd";
import { FormInputProps, FormMultiInputProps } from "./Types";
import MultiDataInput from "./MultiDataInput";

function TextInput(props: FormInputProps<string>) {
  return (
    <Input
      {...(props as any)}
      onChange={(v) => props.onChange(v.target.value)}
      allowClear
    />
  );
}

export function MultiTextInput(props: FormMultiInputProps<string>) {
    return <MultiDataInput renderItem={e => e} SingleInput={TextInput} {...props}/>
}

export default TextInput;