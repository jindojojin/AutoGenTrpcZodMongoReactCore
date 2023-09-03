import React, {FunctionComponent, useState} from "react";
import {Button, Card, CardProps, Col, List, Row} from "antd";
import {ClearOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {showIf} from "../../Common/Utils";

export interface IMultiDataInputProps<T> {
    value?: T[];
    onChange?: (v: T[]) => void;
    disabled?: boolean;
    unitName?: string;
    renderItem: (v: T) => JSX.Element;
    renderList?: (v: T[]) => JSX.Element;
    cardProps?: CardProps;
    headerRight?: JSX.Element;
    SingleInput: FunctionComponent<{ value?: T; onchange?: (v: T) => void }>;
}

function MultiDataInput<T>(props: IMultiDataInputProps<T>) {
    const [tmpValue, setTmpValue] = useState<T[]>();
    return (
        <Card
            bodyStyle={{
                padding: 5,
            }}
            size={"small"}
            {...props.cardProps}
            title={
                <>
                    <Row>
                        <props.SingleInput
                            onchange={(v) => {
                                tmpValue?.push(v);
                            }}
                        />
                        <Col>
                            {showIf(
                                !props.disabled && (props.value ?? tmpValue)?.length,
                                <Button
                                    icon={<ClearOutlined/>}
                                    type={"text"}
                                    onClick={() => {
                                        props.onChange?.([]);
                                        setTmpValue([]);
                                    }}
                                >
                                    Clear all
                                </Button>
                            )}
                            {props.headerRight}
                        </Col>
                    </Row>
                </>
            }
        >
            {props.renderList?.(props.value ?? tmpValue ?? []) ?? (
                <List
                    size={"small"}
                    dataSource={props.value ?? tmpValue ?? []}
                    pagination={{
                        pageSize: 8,
                        size: "small",
                        showTotal: (total) => `Total ${total}`,
                    }}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                showIf(
                                    !props.disabled,
                                    <MinusCircleOutlined
                                        onClick={() => {
                                            const value = (props.value ?? tmpValue ?? []).filter(
                                                (e) => e != item
                                            );
                                            props.onChange?.(value);
                                            setTmpValue(value);
                                        }}
                                    />
                                ),
                            ]}
                        >
                            {props.renderItem(item)}
                        </List.Item>
                    )}
                />
            )}
        </Card>
    );
}

export default MultiDataInput;