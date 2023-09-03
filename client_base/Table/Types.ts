import React from "react";
import {ISchemaFieldConfig} from "../../types/ISchemaDefinition";
import {IColumnType} from "./Utils";

export type TableColumValueRender<V extends any = any, R extends any = any> = (
    config?: ISchemaFieldConfig
) => Partial<IColumnType<R>> & {
    render: (value: V, record?: R) => React.ReactNode;
};

export type TableColumValueFilter<T> = (config: ISchemaFieldConfig) => Partial<IColumnType<T>>