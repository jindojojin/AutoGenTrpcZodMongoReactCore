import { useApiInput, useApiRoute } from "./common";
import { databaseClient } from "../../../../src/trpc/service";
import { APICallbacks, APIConfigs } from "../configs/CommonConfig";
import { t } from "i18next";
import { useCallback } from "react";

export function useDeleteOne(
  configs: APIConfigs,
  callback?: APICallbacks<void, string>
) {
  const route = useApiRoute(configs);
  const buildInput = useApiInput(configs);
  const onDelete = useCallback(async (v: any) => {
    try {
      callback?.onStart?.();
      // @ts-ignore
      const res = await databaseClient[route].deleteOne.mutate(
        buildInput(v._id)
      );
      callback?.onSuccess?.();
    } catch (e) {
      callback?.onError?.(t("deleteError", { name: configs.schema }));
      console.error("Delete error: ", e);
    } finally {
      callback?.onFinish?.();
    }
  }, []);
  return onDelete;
}

export default useDeleteOne;