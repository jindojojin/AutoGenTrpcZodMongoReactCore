import React, { forwardRef, Fragment, useImperativeHandle } from "react";
import IFormConfig, { IFormItemConfig } from "./IFormConfig";
import { Col, Form, Row } from "antd";
import { Controller, FieldPath, FieldValues, useForm } from "react-hook-form";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { showIf } from "../Common/Utils";
import _ from "lodash";

export interface IBasicFormProps<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> {
  config: IFormConfig<T, TName>;
  onSubmit?: (value: T) => void;
  beforeSubmit?: (value: FieldValues) => FieldValues;
  disabled?: boolean;
  layoutKeys?: TName[][];
  layoutSizes?: number[];
}

export interface BasicFormRef<T> {
  triggerSubmit?: () => void;
  setValue?: (v: T | undefined) => void;
}

export const BasicForm = forwardRef(
  <T extends FieldValues, TName extends FieldPath<T>>(
    props: IBasicFormProps<T, TName>,
    ref: React.ForwardedRef<BasicFormRef<T>>
  ) => {
    const { control, handleSubmit, watch, getValues, reset } = useForm<
      T,
      TName
    >();
    useImperativeHandle(ref, () => ({
      triggerSubmit: () => {
        handleSubmit(() => {
          const value = getValues();
          const finalValue = props.beforeSubmit?.(value) ?? value;
          props.onSubmit?.(_.omitBy(finalValue, _.isNil) as T);
        })();
      },
      setValue: (v) => {
        reset((v as any) ?? {});
      },
    }));
    const watchValue = watch(props.config?.watch ?? []);
    const getController = (formItem: IFormItemConfig<T, TName>) => (
      <Controller
        rules={{
          required: {
            value: formItem?.required ?? false,
            message: "This field is required!",
          },
        }}
        control={control}
        name={formItem.key}
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
      <Form layout={"vertical"} disabled={props.disabled}>
        <Row gutter={[10, 10]}>
          {props.layoutKeys ? (
            props.layoutKeys.map((listKeys, i) => (
              <Col key={`col${i}`} span={props.layoutSizes?.[i] ?? 12}>
                {listKeys.map((k, j) => {
                  const item = props.config?.formItems?.find(
                    (item) => item.key == k
                  );
                  return showIf(
                    item,
                    <Fragment key={`col${i}${j}`}>
                      {getController(item as any)}
                    </Fragment>
                  );
                })}
              </Col>
            ))
          ) : (
            <Col span={24}>
              {props.config?.formItems?.map((formItem, i) => (
                <Fragment key={i}>{getController(formItem)}</Fragment>
              ))}
            </Col>
          )}
        </Row>
      </Form>
    );
  }
);
export default BasicForm;