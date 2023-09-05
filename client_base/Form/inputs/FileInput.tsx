import { useCallback, useState } from "react";
import { FormInputProps } from "./Types";
import { Button, Tag, Upload, UploadFile, UploadProps } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import { showIf } from "../../Common/Utils";
import { uploadFiles } from "../../Common/FileService";

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
  const uploadButton = <Button icon={<UploadOutlined />}>Upload file</Button>;
  const preview = showIf(props.value, <Tag title={props.value?.name} />);
  const beforeUpload = useCallback(async (file: RcFile) => {
    const result = await uploadFiles(file, true);
    console.log(result);
    setLoading(true);
    return false;
  }, []);
  return !props.disabled ? (
    <Upload
      {...props}
      name="file"
      showUploadList={true}
      multiple={false}
      // onRemove={() => props.onChange?.(null)}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      <Button icon={<UploadOutlined />}>Select File</Button>
      {/*{props.value ? (*/}
      {/*  <div>*/}
      {/*    <EditOutlined*/}
      {/*      style={{*/}
      {/*        position: "absolute",*/}
      {/*        left: 105,*/}
      {/*        top: 0,*/}
      {/*      }}*/}
      {/*      onClick={(e) => {*/}
      {/*        e.preventDefault();*/}
      {/*        props.onChange?.();*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    {preview}*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  uploadButton*/}
      {/*)}*/}
    </Upload>
  ) : (
    preview
  );
}

export default FileInput;