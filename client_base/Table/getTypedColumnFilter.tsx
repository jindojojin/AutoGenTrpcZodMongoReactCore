import React from "react";
import {IColumnType} from "./Utils";
import {BASIC_TYPE, DataType, isFileType, isSchemaType, SCHEMA_TYPE,} from "../../types/DataTypes";
import {FilterValue} from "antd/es/table/interface";
import {ISchemaFieldConfig} from "../../types/ISchemaDefinition";
import {CustomTableColumnFilter} from "../../../src/common/custom/table/filters";
import { BaseTableColumnFilter } from "./filters";
import { getDateRangeFilterValue } from "./filters/DateRangeFilter";

/**
 * Lấy ra mongodb query cho field
 * @param type
 * @param value
 */
export function getFilterQuery(
  field: string,
  type: DataType,
  value: FilterValue | null
) {
  if (!value) return null;
  try {
    if (Array.isArray(type)) {
      switch (type[0]) {
        case SCHEMA_TYPE.USER:
          return { [field]: { $in: value } };
        default:
          return { [field]: undefined };
      }
    }
    switch (type) {
      case BASIC_TYPE.TEXT:
        return { [field]: { $regex: value[0] } };
      case BASIC_TYPE.ENUM:
      case SCHEMA_TYPE.USER:
        return { [field]: { $in: value } };
      case BASIC_TYPE.DATE_RANGE:
        return getDateRangeFilterValue(field, value as any);
      default:
        return { [field]: value[0] };
    }
  } catch (e) {
    return undefined;
  }
}

function getTypedColumnFilter<T>(
  config: ISchemaFieldConfig
): Partial<IColumnType<T>> {
  const type = Array.isArray(config.type) ? config.type[0] : config.type;
  if (isFileType(type)) {
    return {};
  }
  if (isSchemaType(type)) {
    return CustomTableColumnFilter[type as SCHEMA_TYPE]?.(config) ?? {};
  } else {
    return BaseTableColumnFilter[type as BASIC_TYPE]?.(config) ?? {};
  }
}

export default getTypedColumnFilter;