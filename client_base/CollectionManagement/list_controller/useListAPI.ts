import { LIST_ACTION, ListConfigProps } from "../configs/ListConfigs";
import {
    useImportFromExcelFile,
    useImportFromText,
} from "../api_hooks/useImportMany";
import {
    useExportTemplateToExcel,
    useExportToExcel,
} from "../api_hooks/useExportMany";

function useListAPI<T>(configs: ListConfigProps<T>) {
    const onImportFromText = useImportFromText(
        configs.api,
        configs.callbacks?.[LIST_ACTION.IMPORT_FROM_TEXT],
    );

    const onImportFromExcelFile = useImportFromExcelFile(
        configs.api,
        configs.callbacks?.[LIST_ACTION.IMPORT_FROM_EXCEL],
    );

    const onExportToExcelData = useExportToExcel(
        configs.api,
        configs.callbacks?.[LIST_ACTION.EXPORT_EXCEL_DATA],
    );

    const onExportToExcelTemplate = useExportTemplateToExcel(
        configs.api,
        configs.callbacks?.[LIST_ACTION.EXPORT_EXCEL_TEMPLATE],
    );

    return {
        onImportFromText: configs.usages?.ImportFromText
            ? onImportFromText
            : undefined,
        onImportFromExcelFile: configs.usages?.ImportFromExcel
            ? onImportFromExcelFile
            : undefined,
        onExportToExcelData: configs.usages?.ExportExcelData
            ? onExportToExcelData
            : undefined,
        onExportToExcelTemplate: configs.usages?.ExportExcelTemplate
            ? onExportToExcelTemplate
            : undefined,
    };
}

export default useListAPI;