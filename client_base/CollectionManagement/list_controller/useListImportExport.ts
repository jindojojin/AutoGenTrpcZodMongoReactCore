import { useCallback } from "react";
import { LIST_ACTION, ListConfigProps } from "../configs/ListConfigs";
import { useImportFromText } from "../api_hooks/useImportMany";

function UseListImportExport<T>(configs: ListConfigProps<T>, getListAPI:(action: LIST_ACTION, trigger: any)=>any) {
  const onImportFromText = useCallback(
    () =>
      getListAPI(
        LIST_ACTION.IMPORT_FROM_TEXT,
        useImportFromText(
          configs.api as any,
          configs.callbacks?.[LIST_ACTION.IMPORT_FROM_TEXT] as any
        )
      ),
    [getListAPI]
  );

  const onImportFromExcelFile = useCallback(
    () =>
      getListAPI(
        LIST_ACTION.IMPORT_FROM_EXCEL,
        useImportFromText(
          configs.api as any,
          configs.callbacks?.[LIST_ACTION.IMPORT_FROM_EXCEL] as any
        )
      ),
    [getListAPI]
  );

  const onExportToExcelData = useCallback(
    () =>
      getListAPI(
        LIST_ACTION.EXPORT_EXCEL_DATA,
        useImportFromText(
          configs.api as any,
          configs.callbacks?.[LIST_ACTION.EXPORT_EXCEL_DATA] as any
        )
      ),
    [getListAPI]
  );

  const onExportToExcelTemplate = useCallback(
    () =>
      getListAPI(
        LIST_ACTION.EXPORT_EXCEL_TEMPLATE,
        useImportFromText(
          configs.api as any,
          configs.callbacks?.[LIST_ACTION.EXPORT_EXCEL_TEMPLATE] as any
        )
      ),
    [getListAPI]
  );

  return {
    onImportFromText,
    onImportFromExcelFile,
    onExportToExcelData,
    onExportToExcelTemplate,
  };
}

export default UseListImportExport;