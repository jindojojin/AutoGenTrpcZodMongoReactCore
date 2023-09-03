import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { FormInputProps } from "./Types";

interface DateRange {
  start: Date;
  end: Date;
}

function DateRangeInput(props: FormInputProps<DateRange>) {
  return (
    <DatePicker.RangePicker
      style={{ width: "100%" }}
      format="DD/MM/YYYY"
      allowEmpty={[true, true]}
      {...props}
      value={[
        (props.value?.start ? dayjs(props.value?.start) : undefined) as any,
        (props.value?.end ? dayjs(props.value?.end) : undefined) as any,
      ]}
      onChange={(value) => {
        console.log(value);
        props.onChange?.(
          !value?.[0] || !value?.[1]
            ? undefined
            : {
                start: value[0].toDate(),
                end: value[1].toDate(),
              }
        );
      }}
    />
  );
}

export default DateRangeInput;