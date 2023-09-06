import React from "react";
import { Image, ImageProps } from "antd";
import {showIf} from "../Common/Utils";

function ImageComponent(
  props: { value?: string | { _id: string } } & ImageProps
) {
  return showIf(
    props.value,
    <Image {...props} src={getUploadFileURL(props.value)} />
  );
}

export function getUploadFileURL(value?: string | (any & { _id: string })) {
  return `${import.meta.env.VITE_API_GATEWAY_URL}/storage/file/single/${
    (value as any)?._id ?? value ?? ""
  }`;
}

export default ImageComponent;