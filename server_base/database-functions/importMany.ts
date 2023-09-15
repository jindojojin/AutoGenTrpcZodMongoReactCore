import mongoose from "mongoose";
import { z, ZodTypeAny } from "zod";
import { ISchemaConfig } from "../../share/types/ISchemaConfig";
import { getTempFiles, STempFile } from "../file-storage/FileManager";
import { getSchemaDataFromArray } from "../parsers/DynamicParser";
import {
  getListDataFromExcelTable,
  getListDataFromTextTable,
  getTypedData,
  getTypedDataFromListData,
} from "../parsers/TableParsers";
import { zodErrorOutput } from "../zodUtils";
import { upsertMany, zUpsertOutput } from "./upsertMany";

import { getObjectKeys } from "../../share/CommonFunctions";

export async function importFromExcelFile(
    input: any,
    InputSchema: ZodTypeAny,
    Model: mongoose.Model<any>,
    schemaConfig: ISchemaConfig<any>,
) {
  const file = getTempFiles(input) as STempFile;
  const rows = await getListDataFromExcelTable(file.path);
  return doImport(rows, {
    InputSchema,
    Model,
    schemaConfig,
    initData: input.initData,
  });
}

export async function importFromJsonArray(
    input: any[],
    InputSchema: ZodTypeAny,
    Model: mongoose.Model<any>,
    schemaConfig: ISchemaConfig<any>,
) {
  const records = input.map((data) =>
      getObjectKeys(schemaConfig.fieldConfigs).reduce((prev, field) => {
        return {
          ...prev,
          [field]: getTypedData(
              data[field] ??
              data[schemaConfig.fieldConfigs[field].label as keyof typeof data],
              schemaConfig.fieldConfigs[field].type,
              schemaConfig.fieldConfigs[field].enum,
          ),
        };
      }, new Object({})),
  );
  console.log(`Import ${records.length} record(s) from JSON Aray...`);
  return transformThenImport(records, schemaConfig, InputSchema, Model);
}

export async function importFromText(
    input: any,
    InputSchema: ZodTypeAny,
    Model: mongoose.Model<any>,
    schemaConfig: ISchemaConfig<any>,
) {
  const rows = await getListDataFromTextTable(input.text);
  return doImport(rows, {
    InputSchema,
    Model,
    schemaConfig,
    initData: input.initData,
  });
}

export const zImportOutput = zUpsertOutput.omit({ errors: true }).extend({
  errors: z
  .object({
    idx: z.number(),
    errors: zodErrorOutput.array(),
  })
  .array()
  .optional(),
});
export async function doImport(
    rows: any[],
    config: {
      InputSchema: ZodTypeAny;
      Model: mongoose.Model<any>;
      schemaConfig: ISchemaConfig<any>;
      initData?: any;
    },
) {
  const records = getTypedDataFromListData(
      rows,
      config.schemaConfig,
      config.initData,
  );
  console.log("Records:", records);
  return transformThenImport(
      records,
      config.schemaConfig,
      config.InputSchema,
      config.Model,
  );
}

async function transformThenImport(
    records: any[],
    schemaConfig: ISchemaConfig<any>,
    zodInputSchema: ZodTypeAny,
    Model: mongoose.Model<any>,
): Promise<z.infer<typeof zImportOutput>> {
  if (!records.length) {
    return {
      errors: [],
      updatedCount: 0,
      insertedCount: 0,
      insertedIds: [],
    };
  }
  const data = await getSchemaDataFromArray(
      records,
      schemaConfig,
      zodInputSchema,
  );
  console.log("Try to upsert these records:", data.verifiedRecords);
  console.log("Errors:", data.errorRecords);
  const upsertResult = await upsertMany(
      {
        key: schemaConfig.uniqueKeys,
        data: data.verifiedRecords,
      },
      Model,
      true,
  );

  console.log("Upsert result", upsertResult);

  return {
    ...upsertResult,
    errors: [
      ...data.errorRecords,
      ...(upsertResult.errors ?? []).map((er) => ({
        idx: data.verifiedIndexs[er.idx], //TODO : tính lại idx
        errors: [{ path: undefined, messages: [er.message] }],
      })),
    ],
  };
}