import React from "react";
import { DateRange } from "../../components/DateRange";
import { ISchemaFieldConfig } from "../../../types/ISchemaDefinition";
import { TableColumValueRender } from "../Types";
export const DateRangeColumn: TableColumValueRender = (config) => {
  return {
    render: (value: any) => <DateRange value={value} />,
  };
};