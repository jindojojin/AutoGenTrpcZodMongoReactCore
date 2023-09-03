import { FunctionComponent, useCallback } from "react";
import { FormMultiInputProps } from "./Types";
import { Button, Col, Input, Row } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

export function createMultiInput<T>(
  SingleInput: FunctionComponent<FormMultiInputProps<T>>
) {
  const Input = SingleInput;
  return (props: FormMultiInputProps<T>) => {
    const updateValue = useCallback(
      (v: T | undefined, idx: number) => {
        const newValue = [...(props.value ?? [])];
        newValue[idx] = v;
        props.onChange(newValue);
      },
      [props.value, props.onChange]
    );
    const deleteRow = useCallback(
      (idx: number) => {
        const newValue = [...(props.value ?? [])];
        newValue.splice(idx, 1);
        props.onChange(newValue);
      },
      [props.value, props.onChange]
    );
    return (
      <div>
        {props.value?.map((value: T | null | undefined, idx: number) => (
          <Row style={{ margin: 5 }}>
            <Col flex={"auto"}>
              <Input value={value} onChange={(v: T) => updateValue(v, idx)} />
            </Col>
            <Col style={{ margin: 5 }}>
              <MinusCircleOutlined size={50} onClick={() => deleteRow(idx)} />
            </Col>
          </Row>
        ))}
        <Button
          type={"dashed"}
          onClick={() => props?.onChange([...(props.value ?? []), undefined])}
          style={{ width: "100%", flex: 1, margin: 5 }}
        >
          Add
        </Button>
      </div>
    );
  };
}