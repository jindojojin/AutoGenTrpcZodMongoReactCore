import React from "react";
import { ColumnType } from "antd/es/table";
import { showIf } from "../../Common/Utils";
import { CheckOutlined } from "@ant-design/icons";
import { ISchemaFieldConfig } from "../../../share/types/ISchemaDefinition";

BooleanColumn.propTypes = {};

function BooleanColumn<T>(config: ISchemaFieldConfig): Partial<ColumnType<T>> {
  return {
    render: (value: any) => showIf(value, <CheckOutlined />),
  };
}

export default BooleanColumn;