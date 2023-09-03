import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { FormInputProps } from "./Types";

DateInput.propTypes = {};

function DateInput(props: FormInputProps<Date>) {
  return (
    <DatePicker
      style={{
        flex: 1,
        width: "100%",
      }}
      picker={"date"}
      format={"DD/MM/YYYY"}
      value={props.value ? dayjs(props.value) : undefined}
      onChange={(v) => props.onChange?.(v?.toDate())}
    ></DatePicker>
  );
}

export default DateInput;