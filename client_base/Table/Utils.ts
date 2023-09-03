import { ColumnType } from "antd/es/table";
import _ from "lodash";
import { DataType } from "../../types/DataTypes";
import { ISchemaFieldConfig } from "../../types/ISchemaDefinition";

export interface IColumnType<T> extends ColumnType<T> {
  type: DataType;
}

export function getEnumTitle(config: ISchemaFieldConfig) {
  return _.zipObject(config.enum ?? [], config.enumLabel ?? config.enum ?? []);
}