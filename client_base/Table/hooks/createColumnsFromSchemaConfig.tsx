import React from "react";
import { ISchemaConfig } from "../../../share/types/ISchemaConfig";
import { getObjectKeys } from "../../Common/Utils";
import { ColumnType } from "antd/es/table";
import { IColumnType } from "../Utils";
import getTypedColumnFilter from "../getTypedColumnFilter";
import { getTypedColumnRender } from "../getTypedColumnRender";
import getDefaultSorter from "../sorters/getDefaultSorter";

function createColumnsFromSchemaConfig<T>(
  SchemaConfig: ISchemaConfig<T>,
  customConfig?: {
    hiddenKeys?: (keyof T)[];
    unSortableKeys?: (keyof T)[];
    unFilterableKeys?: (keyof T)[];
    columnsProps?: Partial<{ [k in keyof T]: Partial<ColumnType<T>> }>;
  }
): IColumnType<T>[] {
  return getObjectKeys(SchemaConfig.fieldConfigs)
    .filter(
      (k) =>
        !customConfig?.hiddenKeys?.includes(k) &&
        k != "_id" &&
        !SchemaConfig.fieldConfigs[k].hidden
    )
    .map((field) => {
      const result: IColumnType<T> = {
        type: SchemaConfig.fieldConfigs[field].type,
        dataIndex: String(field),
        title: SchemaConfig.fieldConfigs[field].label,
        ...getTypedColumnRender<T>(SchemaConfig.fieldConfigs[field]),
        ...(customConfig?.unFilterableKeys?.includes(field)
          ? {}
          : getTypedColumnFilter<T>(SchemaConfig.fieldConfigs[field])),
        ...(customConfig?.unSortableKeys?.includes(field)
          ? {}
          : getDefaultSorter<T>(SchemaConfig.fieldConfigs[field])),
        ...(customConfig?.columnsProps?.[field] ?? {}),
      };
      return result;
    });
}

export default createColumnsFromSchemaConfig;