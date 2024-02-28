import { CopyOutlined, ExportOutlined, FileExcelOutlined, } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import _ from "lodash";
import { utils, write } from "xlsx";
import { showIf } from "../../Common/Utils";

TableExporter.propTypes = {};

function TableExporter<T>(props: {
    onExportToExcelData?: () => Promise<void>;
    onExportToExcelTemplate?: () => Promise<void>;
    fileName?: string;
    tableRef?: any;
}) {
    return showIf(
        props.onExportToExcelData || props.onExportToExcelTemplate || props.tableRef,
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
                        props.tableRef
                            ? {
                                label: "Current view to excel data file",
                                key: "excel_data_view",
                                icon: <FileExcelOutlined />,
                            } : null,
                    ]),
                    onClick: async ({ key }) => {
                        switch (key) {
                            case "excel_data":
                                await props.onExportToExcelData?.();
                                break;
                            case "excel_template":
                                await props.onExportToExcelTemplate?.();
                                break;
                            case "excel_data_view":
                                antTableToExcel(props.tableRef, props.fileName);
                                break;
                        }
                    },
                }}
            >
                <Button type="primary" size="small" icon={<ExportOutlined />}>Export</Button>
            </Dropdown>
        </>,
    );
}

function saveExcelFile(worksheets: any[], name: string = "TableExport") {
    const workbook = utils.book_new();
    worksheets.forEach((worksheet, i) => {
        utils.book_append_sheet(workbook, worksheet, `Sheet${i + 1}`);
        const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        // @ts-ignore
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // @ts-ignore
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = `${name}.xlsx`;
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 0);
        }
    });
}

function antTableToExcel(ref: any, filename?: string) {
    console.log("DSFSDLFSDF", ref.current instanceof HTMLTableElement)

    if (ref && ref.current) {

        const table = findAntdTable(ref.current)
        const worksheet = utils.table_to_sheet(
            table as HTMLTableElement,
            {
                raw: true,
                cellStyles: true,
            }
        );
        saveExcelFile([worksheet], filename);
    }
}

function findAntdTable(element: any): HTMLTableElement | null {
    // Kiểm tra xem đối tượng hiện tại có phải là HTMLTableElement không
    if (element instanceof HTMLTableElement) {
        return element; // Nếu là bảng, trả về ngay lập tức
    }

    // Nếu không phải là bảng, duyệt qua các phần tử con và gọi đệ quy
    for (let i = 0; i < element.children.length; i++) {
        const result = findAntdTable(element.children[i]);
        if (result) {
            return result; // Nếu tìm thấy bảng, trả về ngay lập tức
        }
    }

    // Nếu không tìm thấy bảng trong tất cả các phần tử con, trả về null
    return null;
}
export default TableExporter;