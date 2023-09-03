import React from "react";
import ImageComponent from "../../components/ImageComponent";
import { TableColumValueRender } from "../Types";
export const ImageColumn: TableColumValueRender = (config) => {
  return {
    render: (value: any) => <ImageComponent value={value} />,
    align: "center",
    width: 130,
  };
};