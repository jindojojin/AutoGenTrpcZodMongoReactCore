import { CheckOutlined } from "@ant-design/icons";
import React from "react";
import { showIf } from "../../Common/Utils";
import { TableColumValueRender } from "../Types";

export const BooleanColumn: TableColumValueRender<boolean> = () => {
  return {
    render: (value: any) => showIf(value, <CheckOutlined />),
  };
}

export default BooleanColumn;