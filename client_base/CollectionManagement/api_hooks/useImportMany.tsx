import { App, message, Table } from "antd";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { databaseClient } from "../../../../src/trpc/service";
import { uploadFiles } from "../../Common/FileService";
import { useApiInput, useApiRoute, useFixedData } from "./common";
import { APICallbacks, APIConfigs } from "../configs/CommonConfig";
import { t } from "i18next";

function useShowResult() {
  const { notification, modal } = App.useApp();
  const showResult = useCallback(
      async (result: any) => {
        if (result.insertedCount || result.updatedCount) {
          notification.success({
            message: `Success to import ${
                result.insertedCount + result.updatedCount
            } item(s)!`,
          });
        }
        if (result.errors?.length) {
          modal.error({
            width: "90%",
            title: "Import errors",
            content: (
                <Table
                    size={"small"}
                    dataSource={result.errors}
                    columns={[
                      {
                        title: "Record number",
                        dataIndex: "idx",
                        render: (a) => String(a + 1),
                      },
                      {
                        title: "Errors",
                        dataIndex: "errors",
                        render: (msgs: any[]) =>
                            msgs.map((e) => `${e.path} ${e.messages.join(";")}`),
                      },
                    ]}
                ></Table>
            ),
          });
        }
      },
      [notification.success],
  );
  return showResult;
}


export function useImportFromExcelFile<T>(
    configs: APIConfigs,
    callback?: APICallbacks<T>,
) {
  const route = useApiRoute(configs);
  const showResult = useShowResult();
  const buildInput = useApiInput(configs);
  const initData = useFixedData(configs);
  return async (file: any) => {
    callback?.onStart?.();
    try {
      const tempFileID = await uploadFiles(file, true);
      if (tempFileID) {
        console.log("File ID", tempFileID[0]);
        const result = await databaseClient[route].importFromExcelFile.mutate(
            buildInput({
              fileID: tempFileID,
              initData,
            }),
        );
        callback?.onFinish?.();
        await showResult(result);
      }
    } catch (error) {
      message.error(t("importExcelError", { name: configs.schema }));
    } finally {
      callback?.onFinish?.();
    }
  };
}


export function useImportFromText<T>(configs: APIConfigs, callback?: APICallbacks<T>) {
  const route = useApiRoute(configs);
  const { t } = useTranslation("crud");
  const { message } = App.useApp();
  const showResult = useShowResult();
  const buildInput = useApiInput(configs);
  const initData = useFixedData(configs);
  return async (text: string) => {
    callback?.onStart?.();
    try {
      const result = await databaseClient[route].importFromText.mutate(
          buildInput({
            text,
            initData,
          }),
      );
      await showResult(result);
      callback?.onSuccess?.();
    } catch (error) {
      message.error(t("importFromTextError", { name: configs.schema }));
      console.error("Import from text error", error);
    } finally {
      callback?.onFinish?.();
    }
  };
}