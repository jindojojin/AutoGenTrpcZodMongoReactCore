import React, { useCallback, useState } from "react";
import { Upload, UploadFile, UploadProps } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { showIf } from "../../Common/Utils";
import ImageComponent, { getImageSrc } from "../../components/ImageComponent";
import { FormInputProps } from "./Types";

interface IImageInputProps {
  value?: string | { _id: string };
  onChange?: (v?: string) => void;
  disabled?: boolean;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

function ImageInput(props: FormInputProps<string>) {
  const [loading, setLoading] = useState(false);
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "done") {
      console.log(info.file.response);
      props.onChange?.(info.file.response);
      setLoading(false);
    }
    if (info.file.status === "removed") {
      props.onChange?.();
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{loading ? "Uploading" : "Upload"}</div>
    </div>
  );
  const preview = showIf(
    props.value,
    <ImageComponent value={props.value} width={90} preview={false} />
  );
  const beforeUpload = useCallback((file: RcFile) => {
    setLoading(true);
    return true;
  }, []);
  return !props.disabled ? (
    <Upload
      {...props}
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      multiple={false}
      onRemove={() => props.onChange?.(null)}
      accept={".png,.jpeg"}
      action={getImageSrc()}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {props.value ? (
        <div>
          <EditOutlined
            style={{
              position: "absolute",
              left: 105,
              top: 0,
            }}
            onClick={(e) => {
              e.preventDefault();
              props.onChange?.();
            }}
          />
          {preview}
        </div>
      ) : (
        uploadButton
      )}
    </Upload>
  ) : (
    preview
  );
}

export default ImageInput;