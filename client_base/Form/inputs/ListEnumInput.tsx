import React, {useCallback, useMemo} from "react";
import {Card, CardProps, Checkbox, Col, Row} from "antd";
import {getObjectKeys} from "../../Common/Utils";
import {FormMultiInputProps} from "./Types";

type IListEnumInputProps<T extends string> = FormMultiInputProps<T> & {
    enumConfig: Record<T, string>;
    disabled?: boolean;
    cardProps?: CardProps;
    cols?: number;
    headerRight?: JSX.Element;
}

function checkItem(data?: { value: string, label: string }) {
    return data ? <Col span={12}>
        <Checkbox value={data.value}>
            {data.label}
        </Checkbox>
    </Col> : <Col span={12}></Col>
}

function ListEnumInput<T extends string>(props: IListEnumInputProps<T>) {
    console.log("Props", props)
    const allColumns = useMemo(() => {
        return getObjectKeys(props.enumConfig);
    }, [props.enumConfig]);
    const setAll = useCallback(
        (value: any) => {
            if (value.target.checked) {
                props.onChange?.(allColumns);
            } else {
                props.onChange?.([]);
            }
        },
        [props.onChange, allColumns]
    );
    const options = (props.fieldConfig?.enum ?? getObjectKeys(props.enumConfig)).map((e: string) => ({
        label: props.enumConfig?.[e as string] ?? e,
        value: e
    }))
    return (
        <Card
            size={"small"}
            title={
                <div style={{display: "flex"}}>
                    <Checkbox
                        disabled={props.disabled}
                        defaultChecked={false}
                        onChange={setAll}
                    >
                        Check all
                    </Checkbox>
                    <div style={{flex: 1}}></div>
                    {props.headerRight ?? <></>}
                </div>
            }
            {...props.cardProps}
        >
            <Checkbox.Group
                style={{display: "flex", flex: 1}}
                disabled={props.disabled}
                onChange={(list) => props.onChange?.(list as any)}
                value={props.value as any}
            >
                <Row>
                    {options.map((op: any) => checkItem(op))}
                </Row>


                {/*<List*/}
                {/*    style={{display: "flex", flex: 1, border: "solid blue 1px"}}*/}
                {/*    grid={{*/}
                {/*        column: 2,*/}
                {/*        gutter: 16,*/}
                {/*    }}*/}
                {/*    dataSource={props.fieldConfig?.enum ?? getObjectKeys(props.enumConfig)}*/}
                {/*    renderItem={(c, idx) => {*/}
                {/*        return (*/}
                {/*<Checkbox value={c}>*/}
                {/*    {props.enumConfig?.[c as string] ?? c}*/}
                {/*</Checkbox>*/}
                {/*        );*/}
                {/*    }}*/}
                {/*></List>*/}
            </Checkbox.Group>
        </Card>
    )
        ;
}

export default ListEnumInput;