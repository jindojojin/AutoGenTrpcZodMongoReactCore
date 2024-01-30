import {SCHEMA_TYPE} from "../../../schemas/SchemaTypes";
import {VIEW_TYPE} from "../../../views/ViewTypes";

export type APIConfigs<T = any> = {
  schema: SCHEMA_TYPE|VIEW_TYPE;
  dynamic?: {
    categoryId?: string;
  };
  fixedQuery?: any;
  fixedInfo?: Partial<T>;
  initSort?: Partial<Record<keyof T, 1 | -1>>
};

export type APICallbacks<Output, Error = any> = {
  onStart?: () => void;
  onSuccess?: (d: Output) => void;
  onError?: (e: Error) => void;
  onFinish?: () => void;
};
