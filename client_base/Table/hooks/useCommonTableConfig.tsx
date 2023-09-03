import React, { Fragment, useMemo } from "react";
import {Space, TableProps} from "antd";
import { useColumnViewConfig } from "./useColumnViewConfig";
import { IColumnType } from "../Utils";
import { showIf } from "../../Common/Utils";
import { ColumnType } from "antd/es/table";
import _ from "lodash";

function getRowLayout(
  leftComponent?: JSX.Element[],
  rightComponents?: JSX.Element[]
) {
  return () =>
    showIf(
      leftComponent || rightComponents,
      <div style={{ display: "flex", flex: 1 }}>
        <Space>
          {(leftComponent ?? []).map((e, i) => (
            <Fragment key={`left_${i}`}>{e}</Fragment>
          ))}
        </Space>
        <div style={{ flex: 1 }} />
        <Space>
          {(rightComponents ?? []).map((e, i) => (
            <Fragment key={`right_${i}`}>{e}</Fragment>
          ))}
        </Space>
      </div>
    );
}

export interface CommonTableConfig<T> extends TableProps<T>{
  columns: IColumnType<T>[];
  fixedEndColumn?: ColumnType<T>;
  headerLeft?: JSX.Element[];
  headerRight?: JSX.Element[];
  footerLeft?: JSX.Element[];
  footerRight?: JSX.Element[];
  unSortableKeys?: (keyof T)[];
  unFilterableKeys?: (keyof T)[];
  columnsWidth?: (number | undefined)[];
}

/**
 * Trả về default config giao diện cho Table, TODO: không trả về các component mặc định, render dữ liệu
 * @constructor
 * @param config
 */
export function useCommonTableConfig<T>(config: CommonTableConfig<T>) {
  const { columns, ConfigButton } = useColumnViewConfig<T>(config.columns);

  const title = useMemo(
    () =>
      getRowLayout(config.headerLeft, [
        ...(config.headerRight || []),
        ConfigButton,
      ]),
    [config.headerLeft, config.headerRight, ConfigButton]
  );
  const footer = useMemo(
    () => getRowLayout(config.footerLeft, config.footerRight),
    [config.footerLeft, config.footerRight]
  );
  return {
    columns: _.compact([...columns, config.fixedEndColumn]),
    pagination: false,
    bordered: true,
    scroll: { y: 500, x: 1000 },
    title,
    footer,
  };
}