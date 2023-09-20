import React from "react";
import {
    CopyOutlined,
    ExportOutlined,
    FileExcelOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { showIf } from "../../Common/Utils";

TableExporter.propTypes = {};

function TableExporter<T>(props: {
    onExportToExcelData?: () => Promise<void>;
    onExportToExcelTemplate?: () => Promise<void>;
}) {
    return showIf(
        props.onExportToExcelData || props.onExportToExcelTemplate,
        <>
            <Dropdown
                trigger={["click", "click"]}
                menu={{
                    items: _.compact([
                        props.onExportToExcelTemplate
                            ? {
                                label: "To excel template file",
                                key: "excel_template",
                                icon: <FileExcelOutlined />,
                            }
                            : null,
                        props.onExportToExcelData
                            ? {
                                label: "To excel data file",
                                key: "excel_data",
                                icon: <CopyOutlined />,
                            }
                            : null,
                    ]),
                    onClick: async ({ key }) => {
                        switch (key) {
                            case "excel_data":
                                await props.onExportToExcelData?.();
                                break;
                            case "excel_template":
                                await props.onExportToExcelTemplate?.();
                                break;
                        }
                    },
                }}
            >
                <ExportOutlined title={"Export"} />
            </Dropdown>
        </>,
    );
}

export default TableExporter;