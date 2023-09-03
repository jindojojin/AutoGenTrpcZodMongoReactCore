import React from "react";
import { IColumnType } from "./Utils";
import {
  BASIC_TYPE,
  FILE_TYPE,
  isFileType,
  isSchemaType,

} from "../../share/types/DataTypes";
import { ISchemaFieldConfig } from "../../share/types/ISchemaDefinition";
import {
  CustomMultiValueTableColumnRender,
  CustomSingleValueTableColumnRender,
} from "../../../src/common/custom/table/columns";
import {
  BaseMultiValueTableColumnRender,
  BaseSingleValueTableColumnRender,
} from "./columns";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

export function getTypedColumnRender<T>(
  config: ISchemaFieldConfig
): Partial<IColumnType<T>> {
  if (isFileType(config.type)) {
    console.log(`Column render for ${config.label}:`);
    console.log(
      (Array.isArray(config.type)
        ? BaseMultiValueTableColumnRender[
            config.type[0] as BASIC_TYPE | FILE_TYPE
          ] ?? {}
        : BaseSingleValueTableColumnRender[
            config.type as BASIC_TYPE | FILE_TYPE
          ]) ?? {}
    );
  }
  if (isSchemaType(config.type)) {
    return Array.isArray(config.type)
      ? CustomMultiValueTableColumnRender[config.type[0] as SCHEMA_TYPE]?.(
          config
        ) ?? {}
      : CustomSingleValueTableColumnRender[config.type as SCHEMA_TYPE]?.(
          config
        ) ?? {};
  } else {
    return Array.isArray(config.type)
      ? BaseMultiValueTableColumnRender[
          config.type[0] as BASIC_TYPE | FILE_TYPE
        ]?.(config) ?? {}
      : BaseSingleValueTableColumnRender[
          config.type as BASIC_TYPE | FILE_TYPE
        ]?.(config) ?? {};
  }
}