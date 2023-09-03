import { TableColumValueFilter } from "../Types";
import { DateRange } from "../../../types/CommonTypes";
import { FilterFilled, FilterOutlined } from "@ant-design/icons";
import React from "react";
import _ from "lodash";
import {start} from "repl";

export const DateRangeFilter: TableColumValueFilter<DateRange> = (config) => {
  return {
    filters: [
      { value: "present", text: "Running" },
      { value: "passive", text: "Finished" },
      { value: "future", text: "Not started" },
    ],
    filterIcon: (filtered: boolean) =>
      filtered ? (
        <FilterFilled style={{ color: "#1890ff" }} />
      ) : (
        <FilterOutlined />
      ),
  };
};

export function getDateRangeFilterValue(
  fieldName: string,
  filterKeys?: ("present" | "passive" | "future")[]
) {
  if (filterKeys?.length == 1) {
    switch (filterKeys[0]) {
      case "future":
        return {
          [`${fieldName}.start`]: { $gt: new Date() }
        };
      case "passive":
        return {
          [`${fieldName}.end`]: { $lt: new Date() },
        };
      case "present":
        return {
          [`${fieldName}.start`]: { $lte: new Date() },
          [`${fieldName}.end`]: { $gte: new Date() },
        };
    }
  }
  if (filterKeys?.length == 2) {
    if (_.intersection(filterKeys, ["future", "passive"]).length == 2)
      return {
        $or: [{ [`${fieldName}.start`]: { $gt: new Date() } }, { [`${fieldName}.end`]: { $lt: new Date() } }],
      };
    if (_.intersection(filterKeys, ["future", "present"]).length == 2)
      return { [`${fieldName}.end`]: { $gt: new Date() } };
    if (_.intersection(filterKeys, ["passive", "present"]).length == 2)
      return { [`${fieldName}.start`]: { $lt: new Date() } };
  }
  return undefined;
};