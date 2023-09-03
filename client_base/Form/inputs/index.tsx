import {BASIC_TYPE, FILE_TYPE} from "../../../share/types/DataTypes";
import React from "react";
import {FormInputProps, FormMultiInputProps} from "./Types";
import TextInput, {MultiTextInput} from "./TextInput";
import EnumInput from "./EnumInput";
import BooleanInput from "./BooleanInput";
import DateInput from "./DateInput";
import DateRangeInput from "./DateRangeInput";
import NumberInput from "./NumberInput";
import ImageInput from "./ImageInput";
import ListEnumInput from "./ListEnumInput";

export const BaseFormInputs: Partial<
    Record<BASIC_TYPE | FILE_TYPE, React.ComponentType<FormInputProps>>
> = {
    [BASIC_TYPE.TEXT]: TextInput,
    [BASIC_TYPE.ENUM]: EnumInput,
    [BASIC_TYPE.BOOLEAN]: BooleanInput,
    [BASIC_TYPE.DATE]: DateInput,
    [BASIC_TYPE.DATE_RANGE]: DateRangeInput,
    [BASIC_TYPE.NUMBER]: NumberInput,
    [FILE_TYPE.IMAGE]: ImageInput,
};

export const BaseFormMultiInputs: Partial<
    Record<BASIC_TYPE | FILE_TYPE, React.ComponentType<FormMultiInputProps>>
> = {
    [BASIC_TYPE.ENUM]: ListEnumInput,
    [BASIC_TYPE.TEXT]: MultiTextInput
};