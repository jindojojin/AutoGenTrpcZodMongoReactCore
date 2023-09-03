import { ColumnType } from "antd/es/table";
import _ from "lodash";
import { DataType } from "../../share/types/DataTypes";
import { ISchemaFieldConfig } from "../../share/types/ISchemaDefinition";

export interface IColumnType<T> extends ColumnType<T> {
  type: DataType;
}

export function getEnumTitle(config: ISchemaFieldConfig) {
  return _.zipObject(config.enum ?? [], config.enumLabel ?? config.enum ?? []);
}