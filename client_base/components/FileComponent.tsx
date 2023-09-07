import React from "react";
import { showIf } from "../Common/Utils";
import { Button } from "antd";
import { DownloadOutlined, EditOutlined } from "@ant-design/icons";
import { downloadFile } from "../Common/FileService";
import ButtonGroup from "antd/es/button/button-group";

function FileComponent(props: {
    value: any;
    showDownload?: boolean;
    onEdit?: () => void;
}) {
    return showIf(
        props.value,
        <ButtonGroup
            style={{
                flex: 1,
                display: "flex",
            }}
        >
            <Button style={{ flex: 1 }}>{props.value?.originalname}</Button>
            {showIf(
                props.showDownload,
                <Button
                    icon={<DownloadOutlined />}
                    onClick={() => downloadFile(props.value?._id)}
                />
            )}
            {showIf(
                props.onEdit,
                <Button icon={<EditOutlined />} onClick={props.onEdit} />
            )}
        </ButtonGroup>
    );
}

export default FileComponent;