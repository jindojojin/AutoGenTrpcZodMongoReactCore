import React from "react";
import {Image, ImageProps} from "antd";
import {showIf} from "../Common/Utils";
import {getUploadFileURL} from "../Common/FileService";

function ImageComponent(
    props: { value?: string | { _id: string } } & ImageProps,
) {
  return showIf(
      props.value,
      <Image
          style={{borderRadius: 10}}
          {...props}
          src={getUploadFileURL(props.value)}
      />,
  );
}

export default ImageComponent;