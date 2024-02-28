import React from "react";
import {Row, Tag} from "antd";
import {getEnumTitle} from "../Utils";
import {showIf} from "../../Common/Utils";
import {TableColumValueRender} from "../Types";

export const EnumColumn: TableColumValueRender<string> = (config) => {
    return {
        render: (value: any) => {
            return <Tag>{config ? getEnumTitle(config)[value] : value}</Tag>;
        },
    };
};

export const MultiEnumColumn: TableColumValueRender<string> = (config) => {
    return {
        render: (text: any) => {
            return (
                <Row>
                    {text.map((f: string, i: number) =>
                        showIf(
                            f,
                            <Tag key={i} style={{margin: 2, marginInlineEnd: 0}}>
                                {getEnumTitle(config)[f] ?? f}
                            </Tag>,
                        ),
                    )}
                </Row>
            );
        },
    };
};