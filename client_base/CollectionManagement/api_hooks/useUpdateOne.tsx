import {App} from "antd";
import _ from "lodash";
import {databaseClient} from "../../../../src/trpc/service";
import {useApiInput, useApiRoute, useDepopulate, useFixedData,} from "./common";
import {APICallbacks, APIConfigs} from "../configs/CommonConfig";
import {TRPCClientError} from "@trpc/client";

function useUpdateOne(
    configs: APIConfigs,
    callback?: APICallbacks<void, string>
) {
    const route = useApiRoute(configs);
    const depopulate = useDepopulate(configs);
    const api = databaseClient[route].updateOne;
    const {message} = App.useApp();
    const buildInput = useApiInput(configs);
    const fixedData = useFixedData(configs);
    return async (v: any) => {
        try {
            const result = await api.mutate(
                buildInput({
                    id: v._id,
                    data: depopulate(_.merge(v, fixedData)),
                })
            );
            callback?.onSuccess?.();
        } catch (e) {
            if (e instanceof TRPCClientError) callback?.onError?.(e.message);
            console.error("UpdateOne error", e);
            callback?.onError?.(e);
        } finally {
            callback?.onFinish?.();
        }
    };
}

export default useUpdateOne;