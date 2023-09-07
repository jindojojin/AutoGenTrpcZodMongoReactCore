import { useCallback, useState } from "react";
import { FormInputProps } from "./Types";
import {Button, Tag, Upload, UploadFile, UploadProps} from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { showIf } from "../../Common/Utils";
import {getUploadFileURL, uploadFiles} from "../../Common/FileService";
import {UploadOutlined} from "@ant-design/icons";

function FileInput(props: FormInputProps<string>) {
  const [tempFile, setTempFile] = useState();
  const [loading, setLoading] = useState(false);
  const handleChange: UploadProps["onChange"] = (
      info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "done") {
      console.log(info.file.response);
      console.log("Change:", info.file.name);
      props.onChange?.(info.file.response);
      setLoading(false);
    }
    if (info.file.status === "removed") {
      props.onChange?.();
    }
  };
  const preview = showIf(props.value, <Tag title={props.value?.name} />);
  return !props.disabled ? (
      <Upload
          {...props}
          name="file"
          showUploadList={true}
          maxCount={1}
          multiple={false}
          onRemove={() => {
            props.onChange(null);
            return true;
          }}
          action={`${getUploadFileURL()}?temp=true`}
          onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>
  ) : (
      preview
  );
}

export default FileInput;