import {AppstoreOutlined, BorderOutlined, ReloadOutlined,} from "@ant-design/icons";
import {Pagination, Switch, Table, TablePaginationConfig, TableProps, Typography,} from "antd";
import {FilterValue, SorterResult, TableCurrentDataSource,} from "antd/es/table/interface";
import _ from "lodash";
import {useCallback, useMemo, useRef} from "react";
import {FieldValues} from "react-hook-form";
import {DataType} from "../../share/types/DataTypes";
import {getObjectKeys, showIf} from "../Common/Utils";
import {IColumnType} from "../Table/Utils";
import TableExporter from "../Table/components/TableExporter";
import TableImporter from "../Table/components/TableImporter";
import {getFilterQuery} from "../Table/getTypedColumnFilter";
import {CommonTableConfig, useCommonTableConfig,} from "../Table/hooks/useCommonTableConfig";
import useRowActions, {RowActionConfig} from "../Table/hooks/useRowActions";
import withListController, {ControllableListViewProps,} from "./list_controller/withListController";
import {useTranslation} from "react-i18next";

export type TableListProps<T> = ControllableListViewProps<T> &
    CommonTableConfig<T> & {
    table_title?: string;
    headerAdditions?: JSX.Element[];
    rowAdditionActions?: RowActionConfig<T>;
};

export function TableList<T extends FieldValues>(props: TableListProps<T>) {
    const {t} = useTranslation("table");
    const {onChange} = useFilterAndSorterConfig(
        props.columns,
        props.listController?.setSorterConfig,
        props.listController?.setFilterConfig,
    );

    const tableRef = useRef();

    console.log(tableRef.current);

    const { RowActionConfig, ContextMenuComponent, ActionsColumn } =
        useRowActions<T>({
            ...(props.rowAdditionActions || {}),
            contextMenuItems: props.rowAdditionActions?.contextMenuItems || [],
        });

    const TableConfig = useCommonTableConfig({
        fixedEndColumn: ActionsColumn,
        headerLeft: props.headerLeft ?? [
            showIf(
                props.table_title,
                <Typography.Title level={5} style={{ margin: 0 }}>
                    {props.table_title}
                </Typography.Title>,
            ),
        ],
        headerRight: _.compact([
            ...(props.headerAdditions || []),
            <TableImporter {...props.listController} />,
            <TableExporter {...props.listController} tableRef={tableRef}/>,
            props.listController?.reload ? (
                <ReloadOutlined
                    disabled={props.listController?.loading}
                    spin={props.listController?.loading}
                    title={"Reload data"}
                    onClick={props.listController?.reload}
                />
            ) : null,
        ]),
        footerLeft: _.compact([
            (props.listController?.total ?? 0) > 10 ? (
                <Switch
                    defaultValue={false}
                    onChange={(v) =>
                        props.listController?.setPageConfig((prev) => ({
                            ...prev,
                            limit: v ? props.listController?.total ?? 1000000 : 10,
                        }))
                    }
                    title={
                        props.listController?.pageConfig.limit == props.listController?.total
                            ? t("single_page_mode")
                            : t("multi_page_mode")
                    }
                    unCheckedChildren={<AppstoreOutlined/>}
                    checkedChildren={<BorderOutlined/>}
                />
            ) : null,
        ]),
        footerRight: [
            <Pagination
                total={props.listController?.total ?? 0}
                showTotal={(total) => (
                    <Typography.Text strong>Total: {total}</Typography.Text>
                )}
                hideOnSinglePage={true} //Note: dont hide on Single page, it cannot reverse at show All mode :))
                current={
                    (props.listController?.pageConfig?.skip ?? 0) /
                    (props.listController?.pageConfig?.limit ?? 10) +
                    1
                }
                // pageSizeOptions={[10, 20, 30, 50, props.listController?.total ?? 100]}
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
                ref={tableRef as any}
            />
        </div>
    );
}

/////////////Filter & Sorter//////////////////
export function useFilterAndSorterConfig<T>(
    columns: IColumnType<T>[],
    setSorterConfig: any,
    setFilterConfig: any,
): Partial<TableProps<T>> {
    const ColumnType = useMemo(() => {
        return _.reduce(
            columns,
            (result, value) => ({
                ...result,
                [String(value.dataIndex)]: value.type,
            }),
            {} as Record<string, DataType>,
        );
    }, [columns]);
    const onChange = useCallback(
        (
            p: TablePaginationConfig,
            f: Record<string, FilterValue | null>,
            s: SorterResult<T> | SorterResult<T>[],
            e: TableCurrentDataSource<T>,
        ) => {
            // console.log("Sorter Config", s);
            // console.log("Filter Config", f);
            // console.log("Paging Config", p);
            // console.log("Extra", e);
            if (!Array.isArray(s)) s = [s];
            setFilterConfig(
                _.omitBy(
                    getObjectKeys(f).reduce(
                        (prev, field) => ({
                            ...prev,
                            ...getFilterQuery(field, ColumnType[field], f[field]),
                        }),
                        new Object({}),
                    ),
                    _.isNil,
                ),
            );

            setSorterConfig(
                _.omitBy(
                    _.reduce(
                        s,
                        (acc, value) => ({
                            ...acc,
                            [value.field as unknown as any]: getSortValue(value.order),
                        }),
                        {},
                    ),
                    _.isNil,
                ),
            );
        },
        [setFilterConfig, ColumnType, setSorterConfig],
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
export const SchemaTableList = withListController(TableList);
