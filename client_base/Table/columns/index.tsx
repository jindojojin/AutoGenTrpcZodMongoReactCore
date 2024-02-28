import {BASIC_TYPE, FILE_TYPE} from "../../../share/types/DataTypes";
import {TableColumValueRender} from "../Types";
import {BooleanColumn} from "./BooleanColumn";
import DateColumn from "./DateColumn";
import {DateRangeColumn} from "./DateRangeColumn";
import {EnumColumn, MultiEnumColumn} from "./EnumColumn";
import {FileColumn} from "./FileColumn";
import {ImageColumn} from "./ImageColumn";
import {TextColumn} from "./TextColumn";

export const BaseSingleValueTableColumnRender: Partial<
    Record<BASIC_TYPE | FILE_TYPE, TableColumValueRender>
> = {
    [BASIC_TYPE.ENUM]: EnumColumn,
    [BASIC_TYPE.DATE]: DateColumn,
    [BASIC_TYPE.DATE_RANGE]: DateRangeColumn,
    [BASIC_TYPE.TEXT]: TextColumn,
    [FILE_TYPE.IMAGE]: ImageColumn,
    [FILE_TYPE.FILE]: FileColumn,
    [BASIC_TYPE.BOOLEAN]: BooleanColumn,
};
export const BaseMultiValueTableColumnRender: Partial<
    Record<BASIC_TYPE | FILE_TYPE, TableColumValueRender>
> = {
    [BASIC_TYPE.ENUM]: MultiEnumColumn,
};