import React from "react";
import dayjs from "dayjs";
import { TableColumValueRender } from "../Types";

const DateColumn: TableColumValueRender<Date> = () => {
  return {
    render: (value: Date) => (value ? dayjs(value).format("DD/MM/YYYY") : ""),
  };
};

export default DateColumn;