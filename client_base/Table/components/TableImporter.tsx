import React, {useCallback, useRef, useState} from "react";
import {Dropdown} from "antd";
import {CopyOutlined, FileExcelOutlined, ImportOutlined,} from "@ant-design/icons";

import {showIf} from "../../Common/Utils";

const EXTENSIONS = {
    excel: ".xlsx,.xls",
    csv: ".csv,.txt",
};

function TableImporter<T>(props: {
    onImportFromText?: (text: string) => Promise<any>,
    onImportFromExcel?: (file: any) => Promise<any>
}) {

    const handlePaste = useCallback(() => {
        try {
            navigator.clipboard.readText().then((r) => {
                props.onImportFromText?.(r);
            });
        } catch (error) {
            console.error("Error reading clipboard data:", error);
            return "";
        }
    }, [props.onImportFromText]);
    const [uploadType, setUploadType] = useState<"excel" | "csv">("excel");
    const fileInput = useRef<HTMLInputElement>();
    const handleFileUpload = useCallback(
        (event: any) => {
            props.onImportFromExcel?.(event.target.files[0]);
        },
        [props.onImportFromExcel]
    );
    return showIf(
        props.onImportFromExcel || props.onImportFromText,
        <>
            <Dropdown
                trigger={["click", "click"]}
                menu={{
                    items: [
                        {
                            label: "From excel file",
                            key: "excel",
                            icon: <FileExcelOutlined/>,
                        },
                        {
                            label: "Paste from excel",
                            key: "clipboard",
                            icon: <CopyOutlined/>,
                        },
                    ],
                    onClick: async ({key}) => {
                        switch (key) {
                            case "excel":
                                setUploadType("excel");
                                fileInput.current?.setAttribute?.("accept", ".xlsx, .xls");
                                fileInput.current?.click();
                                break;
                            case "csv":
                                setUploadType("csv");
                                fileInput.current?.setAttribute?.("accept", ".csv");
                                fileInput.current?.click();
                                break;
                            case "clipboard":
                                handlePaste();
                                break;
                        }
                    },
                }}
            >
                <ImportOutlined title={"Import"}/>
            </Dropdown>
            <input
                ref={fileInput as any}
                style={{display: "none"}}
                type={"file"}
                accept={EXTENSIONS[uploadType]}
                onChange={handleFileUpload}
            />
        </>
    );
}

export default TableImporter;