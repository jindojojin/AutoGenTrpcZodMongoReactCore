import { SCHEMA_TYPE } from "../../../types/DataTypes";

export type APIConfigs<T = any> = {
  schema: SCHEMA_TYPE;
  dynamic?: {
    categoryId?: string;
  };
  fixedQuery?: any;
  fixedInfo?: Partial<T>;
};

export type APICallbacks<Output, Error = any> = {
  onStart?: () => void;
  onSuccess?: (d: Output) => void;
  onError?: (e: Error) => void;
  onFinish?: () => void;
};