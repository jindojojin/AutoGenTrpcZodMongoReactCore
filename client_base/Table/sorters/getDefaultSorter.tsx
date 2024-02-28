import React from "react";
import { IColumnType } from "../Utils";
import { ISchemaFieldConfig } from "../../../share/types/ISchemaDefinition";

function GetDefaultSorter<T>(
    config: ISchemaFieldConfig,
): Partial<IColumnType<T>> {
  return {
    sorter: { multiple: 1 },
  };
}

export default GetDefaultSorter;