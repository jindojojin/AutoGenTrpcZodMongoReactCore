import { useMemo } from "react";
import { databaseClient, simplePopulate } from "../../../../src/trpc/service";
import { downloadFile } from "../../Common/FileService";
import { useApiInput, useApiRoute, useFixedQuery } from "./common";
import { APICallbacks, APIConfigs } from "../configs/CommonConfig";
import { SCHEMAS_CONFIG } from "../../../share/schema_configs";

export function useExportToExcel<T>(
  configs: APIConfigs,
  query?: any,
  callback?: APICallbacks<void>
) {
  const route = useApiRoute(configs);
  const buildInput = useApiInput(configs);
  const exportToExcelApi = databaseClient[route].exportToExcelFile;
  const exportQuery = useMemo(
    () => buildInput({ query: getExportQuery(configs, query) }),
    [buildInput]
  );
  return async () => {
    callback?.onStart?.();
    const fileID = await exportToExcelApi.mutate(exportQuery);
    console.log("Download excel file", fileID);
    await downloadFile(fileID, true);
    callback?.onFinish?.();
  };
}

export function useExportTemplateToExcel(
  configs: APIConfigs,
  query?: any,
  callback?: APICallbacks<void>
) {
  const buildInput = useApiInput(configs);
  const exportTemplateQuery = useMemo(
    () => buildInput({ query: getExportQuery(configs, query), template: true }),
    [buildInput]
  );
  const route = useApiRoute(configs);
  return async () => {
    callback?.onStart?.();

    const exportToExcelApi = databaseClient[route].exportToExcelFile;
    const fileID = await exportToExcelApi.mutate(exportTemplateQuery);
    console.log("Download excel file", fileID);
    await downloadFile(fileID, true);
    callback?.onFinish?.();
  };
}

function getExportQuery(configs: APIConfigs, filter: any = {}) {
  const fixedQuery = useFixedQuery(configs);
  return {
    where: { $and: [filter, ...fixedQuery] },
    options: {
      populate: simplePopulate(SCHEMAS_CONFIG[configs.schema].relationKeys),
    },
  };
}