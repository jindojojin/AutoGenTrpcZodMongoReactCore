import { LIST_ACTION, ListConfigProps } from "../configs/ListConfigs";
import {
    useImportFromExcelFile,
    useImportFromText,
} from "../api_hooks/useImportMany";
import {
    useExportTemplateToExcel,
    useExportToExcel,
} from "../api_hooks/useExportMany";
import { useListUsagesByUserScopes } from "../utils/useFormUsagesByUserScopes";

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

    const usages =
        configs.usages ?? useListUsagesByUserScopes(configs.api.schema);

    return {
        onImportFromText: usages?.ImportFromText ? onImportFromText : undefined,
        onImportFromExcelFile: usages?.ImportFromExcel
            ? onImportFromExcelFile
            : undefined,
        onExportToExcelData: usages?.ExportExcelData
            ? onExportToExcelData
            : undefined,
        onExportToExcelTemplate: usages?.ExportExcelTemplate
            ? onExportToExcelTemplate
            : undefined,
    };
}

export default useListAPI;