import {BASIC_TYPE, FILE_TYPE} from "../../../share/types/DataTypes";
import {TableColumValueFilter, TableColumValueRender} from "../Types";
import {EnumColumn} from "../columns/EnumColumn";
import DateColumn from "../columns/DateColumn";
import {DateRangeColumn} from "../columns/DateRangeColumn";
import {TextColumn} from "../columns/TextColumn";
import {ImageColumn} from "../columns/ImageColumn";
import {EnumFilter} from "./EnumFilter";
import {TextFilter} from "./TextFilter";
import {DateRangeFilter} from "./DateRangeFilter";

export const BaseTableColumnFilter: Partial<
    Record<BASIC_TYPE, TableColumValueFilter<any>>
> = {
    [BASIC_TYPE.ENUM]: EnumFilter,
    [BASIC_TYPE.DATE]: DateColumn,
    [BASIC_TYPE.DATE_RANGE]: DateRangeFilter,
    [BASIC_TYPE.TEXT]: TextFilter,
};