import { LIST_ACTION } from "./ListConfigs";
import {
  useImportFromExcelFile,
  useImportFromText,
} from "../api_hooks/useImportMany";
import {
  useExportTemplateToExcel,
  useExportToExcel,
} from "../api_hooks/useExportMany";
import { FORM_ACTION } from "./FormConfigs";
import { useCreateOne } from "../api_hooks/useCreateOne";
import useDeleteOne from "../api_hooks/useDeleteOne";
import useUpdateOne from "../api_hooks/useUpdateOne";

export const ACTION_2_API = {
  [LIST_ACTION.IMPORT_FROM_TEXT]: useImportFromText,
  [LIST_ACTION.IMPORT_FROM_EXCEL]: useImportFromExcelFile,
  [LIST_ACTION.EXPORT_EXCEL_TEMPLATE]: useExportTemplateToExcel,
  [LIST_ACTION.EXPORT_EXCEL_DATA]: useExportToExcel,
  [LIST_ACTION.RELOAD]:()=>{},
  [FORM_ACTION.CREATE]: useCreateOne,
  [FORM_ACTION.DELETE]: useDeleteOne,
  [FORM_ACTION.UPDATE]: useUpdateOne,
};