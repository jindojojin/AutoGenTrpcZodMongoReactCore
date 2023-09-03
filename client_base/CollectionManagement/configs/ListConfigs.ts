import {APICallbacks, APIConfigs} from "./CommonConfig";

export type ListConfigProps<T> = {
  api:APIConfigs<T>
  callbacks?: Partial<Record<LIST_ACTION, APICallbacks<T>>>;
  usages?: Partial<Record<LIST_ACTION, boolean>>;
};

export enum LIST_ACTION {
  RELOAD = "Reload",
  IMPORT_FROM_TEXT = "ImportFromText",
  IMPORT_FROM_EXCEL = "ImportFromExcel",
  EXPORT_EXCEL_DATA = "ExportExcelData",
  EXPORT_EXCEL_TEMPLATE = "ExportExcelTemplate",
  ITEM_ACTIONS = "ItemActions",
}