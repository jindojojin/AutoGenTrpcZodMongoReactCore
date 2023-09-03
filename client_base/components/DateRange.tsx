import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import localizeFormat from "dayjs/plugin/localizedFormat";
import React from "react";
import { Tag, TagProps } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import {showIf} from "../Common/Utils";

dayjs.extend(isBetween);
dayjs.extend(localizeFormat);

const TagPropByCurrentTime = {
  passive: {
    title: "Finished",
    color: "error",
  },
  present: {
    title: "Running",
    color: "success",
  },
  future: {
    title: "Not started",
  },
};

function getTagStatus(dateRange?: {
  start: Date;
  end: Date;
}): Partial<TagProps> {
  if (!dateRange) return {};
  let status: "future" | "present" | "passive";
  if (dayjs().isBetween(dateRange.start, dateRange.end)) status = "present";
  else if (dayjs().isAfter(dateRange.end)) status = "passive";
  else status = "future";
  return TagPropByCurrentTime[status];
}

export const DateRange = (props: {
  value?: {
    start: Date;
    end: Date;
  };
}) =>
  showIf(
    props.value,
    <Tag {...getTagStatus(props.value)}>
      {dayjs(props.value?.start).format("DD/MM/YYYY  ")}
      <SwapRightOutlined size={20} />
      {dayjs(props.value?.end).format("  DD/MM/YYYY")}
    </Tag>
  );