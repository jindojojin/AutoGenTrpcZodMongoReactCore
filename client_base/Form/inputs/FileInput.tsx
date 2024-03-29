import { useState } from "react";
import { FormInputProps } from "./Types";
import { Button, Upload, UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { getUploadFileURL } from "../../Common/FileService";
import { UploadOutlined } from "@ant-design/icons";
import FileComponent from "../../components/FileComponent";

function FileInput(props: FormInputProps<string | Object>) {
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
    return !props.value?._id ? (
        <Upload
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
        <FileComponent value={props.value} onEdit={() => props.onChange()} />
    );
}

export default FileInput;