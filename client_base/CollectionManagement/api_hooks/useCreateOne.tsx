import _ from "lodash";
import {
  useApiInput,
  useApiRoute,
  useDepopulate,
  useFixedData,
} from "./common";
import { databaseClient } from "../../../../src/trpc/service";
import { TRPCClientError } from "@trpc/client";
import { APICallbacks, APIConfigs } from "../configs/CommonConfig";

export function useCreateOne<
  DataInput extends any = any,
  DataOutput = DataInput
>(configs: APIConfigs, callback?: APICallbacks<DataOutput>) {
  const depopulate = useDepopulate(configs);
  const route = useApiRoute(configs);
  const fixedData = useFixedData(configs);
  const buildInput = useApiInput(configs);

  return async (v: any) => {
    try {
      callback?.onStart?.();
      const res = await databaseClient[route].createOne.mutate(
        buildInput(depopulate(_.merge(v, fixedData)))
      );
      callback?.onSuccess?.(res);
    } catch (e) {
      if (e instanceof TRPCClientError) {
        callback?.onError?.(e.message);
      }
      console.error("Create error: ", e);
    } finally {
      callback?.onFinish?.();
    }
  };
}