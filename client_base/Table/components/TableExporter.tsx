import React from "react";
import {
  CopyOutlined,
  ExportOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useExportToExcel } from "../../../../src/common/base/crud/api_hooks/useReadAPIs";
import { showIf } from "../../Common/Utils";

TableExporter.propTypes = {};

function TableExporter<T>() {
    const {onExportTemplateToExcel, onExportDataToExcel} = useExportToExcel();
    return showIf(
        onExportTemplateToExcel || onExportDataToExcel,
        <>
            <Dropdown
                trigger={["click", "click"]}
                menu={{
                    items: [
                        {
                            label: "To excel template file",
                            key: "excel_template",
                            icon: <FileExcelOutlined/>,
                        },
                        {
            label: "To excel data file",
            key: "excel_data",
            icon: <CopyOutlined />,
          },
        ],
        onClick: async ({ key }) => {
          switch (key) {
            case "excel_data":
              await onExportDataToExcel?.();
              break;
            case "excel_template":
              await onExportTemplateToExcel?.();
              break;
          }
        },
      }}
    >
      <Button icon={<ExportOutlined />}>Export</Button>
    </Dropdown>
  </>
);
}

export default TableExporter;