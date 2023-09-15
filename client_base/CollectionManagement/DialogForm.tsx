import React, { useEffect } from "react";
import { Controller, FieldPath, FieldValues, useForm } from "react-hook-form";
import IFormConfig, { IFormItemConfig } from "../Form/IFormConfig";
import { Col, Form, Modal, ModalProps, Row } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {getObjectKeys, showIf} from "../Common/Utils";
import { ControllableFormViewProps } from "./form_controller/withFormController";
import _ from "lodash";

export type FormViewProps<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> = ControllableFormViewProps<T> & {
  modalProps?: ModalProps;
  onClose?: () => void;
  config: IFormConfig<T, TName>;
  layout?: (keyof T)[][];
};

function DialogForm<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
>(props: FormViewProps<T, TName>) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    resetField,
  } = useForm<T, TName>();
  const watchValue = watch(props.config?.watch ?? []);
  useEffect(() => {
    console.log("Reset value to ", props.initValue);
    if (props.initValue) reset(props.initValue);
    else
      getObjectKeys(getValues()).forEach((k) =>
        setValue(k as any, undefined as any)
      );
  }, [props.initValue]);
  const getController = (formItem: IFormItemConfig<T, TName>) => (
    <Controller
      rules={{
        required: {
          value: formItem?.required ?? false,
          message: "This field is required!",
        },
      }}
      control={control}
      name={formItem?.key}
      render={(renderProps) => (
        <Form.Item
          label={formItem?.label}
          required={formItem?.required}
          help={renderProps.fieldState.error?.message}
          validateStatus={renderProps.fieldState.error ? "error" : "success"}
          tooltip={
            formItem?.hint
              ? {
                  title: formItem?.hint,
                  icon: <QuestionCircleOutlined />,
                }
              : undefined
          }
        >
          {formItem?.render({
            ...renderProps,
            watchValue,
          })}
        </Form.Item>
      )}
    />
  );

  return (
    <Modal width={800}
      {...props.modalProps}
      title={props.config?.label}
      onOk={() => {
        console.log("Submit trigger", getValues());
        props.onSubmit?.(getValues());
        props.onClose?.();
      }}
    >
      <Form layout={"vertical"}>
        {(
          props.layout ??
          getDefaultLayout(props.config.formItems.map((i) => i.key))
        ).map((listKeys, i) => (
          <Row gutter={[10, 10]}>
            {listKeys.map((k, j) => {
              const item = props.config?.formItems?.find(
                (item) => item.key == k
              );
              return (
                <Col key={`col${i}${j}`} span={24 / listKeys.length}>
                  {showIf(item, getController(item as any))}
                </Col>
              );
            })}
          </Row>
        ))}
      </Form>
    </Modal>
  );
}

function getDefaultLayout(keys: any[]) {
  const expectedItemsPerCol = 5;
  let colCount = 4;
  const itemCount = keys.length;
  while (itemCount / colCount >= expectedItemsPerCol && colCount > 1) {
    colCount = colCount - 1;
  }
  return _.chunk(keys, Math.ceil(itemCount / colCount));
}

export default DialogForm;