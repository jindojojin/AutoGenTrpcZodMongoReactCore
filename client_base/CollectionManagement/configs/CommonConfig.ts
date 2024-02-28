import { SCHEMA_TYPE } from "../../../schemas/SchemaTypes";
import { VIEW_TYPE } from "../../../views/ViewTypes";
import { TABLE_API } from "../../../custom_apis/TableAPI";

export type APIConfigs<T = any> = {
  schema: SCHEMA_TYPE | VIEW_TYPE | TABLE_API;
  dynamic?: {
    categoryId?: string;
  };
  fixedQuery?: any;
  fixedInfo?: Partial<T>;
  initSort?: Partial<Record<keyof T, 1 | -1>>;
  fixedParams?:any;// use for logical view (TABLE_API)
};

export type APICallbacks<Output, Error = any> = {
  onStart?: () => void;
  onSuccess?: (d: Output) => void;
  onError?: (e: Error) => void;
  onFinish?: () => void;
};
