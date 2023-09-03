import React, { useContext, useRef } from "react";
import useFilterAndSorterConfig from "./hooks/useFilterAndSorterConfig";
import useRowActions, { RowActionConfig } from "./hooks/useRowActions";
import {
  CommonTableConfig,
  useCommonTableConfig,
} from "./hooks/useCommonTableConfig";
import TablePaging from "./components/TablePaging";
import { Button, Table } from "antd";
import { FieldValues } from "react-hook-form";
import { ReloadOutlined } from "@ant-design/icons";
import { IColumnType } from "./Utils";
import { showIf } from "../Common/Utils";
import { ListDataContext } from "../Common/ListDataContext";

export interface IBasicTableProps<T extends FieldValues>
  extends CommonTableConfig<T> {
  columns: IColumnType<T>[];
  headerAdditions?: JSX.Element[];
  rowAdditionActions?: RowActionConfig<T>;
  hideExport?: boolean;
  hideImport?: boolean;
}

function BasicTable<T extends FieldValues>(props: IBasicTableProps<T>) {
  const { data, total, reload, loading } = useContext(ListDataContext);
  // const loadData = useFindMany()
  const { onChange } = useFilterAndSorterConfig(props.columns);
  const { RowActionConfig, ContextMenuComponent, ActionsColumn } =
    useRowActions<T>({
      ...(props.rowAdditionActions || {}),
      contextMenuItems: props.rowAdditionActions?.contextMenuItems || [],
    });
  const tableRef = useRef();
  const TableConfig = useCommonTableConfig({
    ...props,
    fixedEndColumn: ActionsColumn,
    headerRight: [
      ...(props.headerAdditions || []),
      showIf(
        reload,
        <Button
          title={"Reload data"}
          icon={<ReloadOutlined />}
          onClick={reload}
        />
      ),
    ],
    footerRight: [<TablePaging />],
  });
  return (
    <div>
      <ContextMenuComponent />
      <Table
        {...props}
        rowKey={"_id"}
        size={"small"}
        ref={tableRef as any}
        loading={loading} // TODO update loading
        onChange={onChange}
        dataSource={data}
        {...RowActionConfig}
        {...TableConfig}
        scroll={{ x: true }}
      />
    </div>
  );
}

export default BasicTable;