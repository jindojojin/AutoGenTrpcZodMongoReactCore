import { BASIC_TYPE, FILE_TYPE } from "../../../types/DataTypes";
import { EnumColumn } from "./EnumColumn";
import { TableColumValueRender } from "../Types";
import DateColumn from "./DateColumn";
import { TextColumn } from "./TextColumn";
import {DateRangeColumn} from "./DateRangeColumn";
import {ImageColumn} from "./ImageColumn";

export const BaseSingleValueTableColumnRender: Partial<
  Record<BASIC_TYPE | FILE_TYPE, TableColumValueRender>
> = {
  [BASIC_TYPE.ENUM]: EnumColumn,
  [BASIC_TYPE.DATE]: DateColumn,
  [BASIC_TYPE.DATE_RANGE]: DateRangeColumn,
  [BASIC_TYPE.TEXT]: TextColumn,
  [FILE_TYPE.IMAGE]: ImageColumn,
};
export const BaseMultiValueTableColumnRender: Partial<
  Record<BASIC_TYPE | FILE_TYPE, TableColumValueRender>
> = {};