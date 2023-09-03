import React from "react";
import { showIf } from "../../Common/Utils";
import { Typography } from "antd";
import { TableColumValueRender } from "../Types";

export const TextColumn: TableColumValueRender = (config) => {
  return {
    render: (value: any) =>
      showIf(value, <Typography>{String(value)}</Typography>),
  };
};