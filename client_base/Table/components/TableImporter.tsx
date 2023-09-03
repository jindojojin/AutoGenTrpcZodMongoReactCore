import React, { useCallback, useRef, useState } from "react";
import { Button, Dropdown } from "antd";
import {
  CopyOutlined,
  FileExcelOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import {
  useImportFromExcelFile,
  useImportFromText,
} from "../../../../src/common/base/crud/api_hooks/useImportMany";
import { showIf } from "../../Common/Utils";

const EXTENSIONS = {
  excel: ".xlsx,.xls",
  csv: ".csv,.txt",
};

function TableImporter<T>() {
  const onTextImport = useImportFromText();
  const onExcelFileImport = useImportFromExcelFile();
  const handlePaste = useCallback(() => {
    try {
      navigator.clipboard.readText().then((r) => {
        onTextImport?.(r);
      });
    } catch (error) {
      console.error("Error reading clipboard data:", error);
      return "";
    }
  }, [onTextImport]);
  const [uploadType, setUploadType] = useState<"excel" | "csv">("excel");
  const fileInput = useRef<HTMLInputElement>();
  const handleFileUpload = useCallback(
    (event: any) => {
      onExcelFileImport?.(event.target.files[0]);
    },
    [onExcelFileImport]
  );
  return showIf(
    onExcelFileImport || onTextImport,
    <>
      <Dropdown
        trigger={["click", "click"]}
        menu={{
          items: [
            {
              label: "From excel file",
              key: "excel",
              icon: <FileExcelOutlined />,
            },
            {
              label: "Paste from excel",
              key: "clipboard",
              icon: <CopyOutlined />,
            },
          ],
          onClick: async ({ key }) => {
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
        <Button icon={<ImportOutlined />}>Import</Button>
      </Dropdown>
      <input
        ref={fileInput as any}
        style={{ display: "none" }}
        type={"file"}
        accept={EXTENSIONS[uploadType]}
        onChange={handleFileUpload}
      />
    </>
  );
}

export default TableImporter;