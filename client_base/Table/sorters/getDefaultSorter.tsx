import React from "react";
import { BASIC_TYPE } from "../../../share/types/DataTypes";
import { IColumnType } from "../Utils";
import { ISchemaFieldConfig } from "../../../share/types/ISchemaDefinition";

function GetDefaultSorter<T>(
  config: ISchemaFieldConfig
): Partial<IColumnType<T>> {
  if (
    !Array.isArray(config.type) &&
    Object.values(BASIC_TYPE).includes(config.type as BASIC_TYPE)
  )
    return {
      sorter: { multiple: 1 },
    };
  return {};
}

export default GetDefaultSorter;