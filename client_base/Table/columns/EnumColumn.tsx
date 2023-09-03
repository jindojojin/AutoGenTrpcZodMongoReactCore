import React from "react";
import { ColumnType } from "antd/es/table";
import { Row, Tag } from "antd";
import { getEnumTitle } from "../Utils";
import { showIf } from "../../Common/Utils";
import { ISchemaFieldConfig } from "../../../types/ISchemaDefinition";
import { TableColumValueRender } from "../Types";

export const EnumColumn: TableColumValueRender<string> = (config) => {
  return {
    render: (value: any) => {
      return <Tag>{config ? getEnumTitle(config)[value] : value}</Tag>;
    },
  };
};

export function MultiEnumColumn<T>(
  config: ISchemaFieldConfig
): Partial<ColumnType<T>> {
  return {
    render: (text: any) => {
      return (
        <Row>
          {text.map((f: string, i: number) =>
            showIf(
              f,
              <Tag key={i} style={{ margin: 2, marginInlineEnd: 0 }}>
                {getEnumTitle(config)[f] ?? f}
              </Tag>
            )
          )}
        </Row>
      );
    },
  };
}