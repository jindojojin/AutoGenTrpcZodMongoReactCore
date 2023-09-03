import React, { useCallback, useMemo } from "react";
import { ControllableListViewProps } from "./list_controller/withListController";
import useRowActions, { RowActionConfig } from "../Table/hooks/useRowActions";
import {
  CommonTableConfig,
  useCommonTableConfig,
} from "../Table/hooks/useCommonTableConfig";
import {getObjectKeys, showIf} from "../Common/Utils";
import {
  Pagination,
  Table,
  TablePaginationConfig,
  TableProps,
  Typography,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import _ from "lodash";
import { DataType } from "../../types/DataTypes";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import { IColumnType } from "../Table/Utils";
import { getFilterQuery } from "../Table/getTypedColumnFilter";
import { FieldValues } from "react-hook-form";

export type TableListProps<T> = ControllableListViewProps<T> &
  CommonTableConfig<T> & {
    title?: string;
    headerAdditions?: JSX.Element[];
    rowAdditionActions?: RowActionConfig<T>;
  };

function TableList<T extends FieldValues>(props: TableListProps<T>) {
  const { onChange } = useFilterAndSorterConfig(
    props.columns,
    props.listController?.setSorterConfig,
    props.listController?.setFilterConfig
  );

  const { RowActionConfig, ContextMenuComponent, ActionsColumn } =
    useRowActions<T>({
      ...(props.rowAdditionActions || {}),
      contextMenuItems: props.rowAdditionActions?.contextMenuItems || [],
    });

  const TableConfig = useCommonTableConfig({
    fixedEndColumn: ActionsColumn,
    headerLeft: props.headerLeft ?? [
      showIf(
        props.title,
        <Typography.Title level={5} style={{ margin: 0 }}>
          {props.title}
        </Typography.Title>
      ),
    ],
    headerRight: [
      ...(props.headerAdditions || []),
      showIf(
        props.listController?.reload,
        <ReloadOutlined
          disabled={props.listController?.loading}
          spin={props.listController?.loading}
          title={"Reload data"}
          onClick={props.listController?.reload}
        />
      ),
    ],
    footerRight: [
      <Pagination
        total={props.listController?.total ?? 0}
        showTotal={(total) => (
          <Typography.Text strong>Total: {total}</Typography.Text>
        )}
        // hideOnSinglePage={true}
        current={
          (props.listController?.pageConfig?.skip ?? 0) /
            (props.listController?.pageConfig?.limit ?? 10) +
          1
        }
        pageSizeOptions={[10, 20, 30, 50, props.listController?.total ?? 100]}
        defaultPageSize={props.listController?.pageConfig?.limit}
        pageSize={props.listController?.pageConfig?.limit}
        onChange={(page, pageSize) => {
          props.listController?.setPageConfig?.({
            skip: (page - 1) * pageSize,
            limit: pageSize,
          });
        }}
      />,
    ],
    ...props,
  });
  return (
    <div>
      <ContextMenuComponent />
      <Table
        {...props}
        rowKey={"_id"}
        size={"small"}
        loading={props.listController?.loading}
        onChange={onChange}
        dataSource={props.listController?.data}
        {...RowActionConfig}
        {...TableConfig}
        scroll={{ x: true }}
      />
    </div>
  );
}

/////////////Filter & Sorter//////////////////
function useFilterAndSorterConfig<T>(
  columns: IColumnType<T>[],
  setSorterConfig: any,
  setFilterConfig: any
): Partial<TableProps<T>> {
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

export default TableList;