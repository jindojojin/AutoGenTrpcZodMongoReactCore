import React, { useCallback, useContext, useMemo } from "react";
import _ from "lodash";
import { TablePaginationConfig, TableProps } from "antd";
import { getFilterQuery } from "../getTypedColumnFilter";
import { DataType } from "../../../types/DataTypes";
import { IColumnType } from "../Utils";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import { ListDataContext } from "../../Common/ListDataContext";
import { getObjectKeys } from "../../../utils/Utils";

function useFilterAndSorterConfig<T>(
  columns: IColumnType<T>[]
): Partial<TableProps<T>> {
  const { setSorterConfig, setFilterConfig } = useContext(ListDataContext);
  const ColumnType = useMemo(() => {
    return _.reduce(
      columns,
      (result, value) => ({
        ...result,
        [String(value.dataIndex)]: value.type,
      }),
      {} as Record<string, DataType>
    );
  }, [columns]);
  const onChange = useCallback(
    (
      p: TablePaginationConfig,
      f: Record<string, FilterValue | null>,
      s: SorterResult<T> | SorterResult<T>[],
      e: TableCurrentDataSource<T>
    ) => {
      console.log("Sorter Config", s);
      console.log("Filter Config", f);
      console.log("Paging Config", p);
      console.log("Extra", e);
      if (!Array.isArray(s)) s = [s];
      setFilterConfig(
        _.omitBy(
          getObjectKeys(f).reduce(
            (prev, field) => ({
              ...prev,
              ...getFilterQuery(field, ColumnType[field], f[field]),
            }),
            new Object({})
          ),
          _.isNil
        )
      );

      setSorterConfig(
        _.omitBy(
          _.reduce(
            s,
            (acc, value) => ({
              ...acc,
              [value.field as unknown as any]: getSortValue(value.order),
            }),
            {}
          ),
          _.isNil
        )
      );
    },
    [setFilterConfig, ColumnType, setSorterConfig]
  );
  return {
    onChange,
  };
}

function getSortValue(order: any) {
  switch (order) {
    case "ascend":
      return 1;
    case "descend":
      return -1;
    default:
      return undefined;
  }
}

export default useFilterAndSorterConfig;