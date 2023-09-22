import {z} from "zod";
import {getTempFiles, STempFile} from "../file-storage/FileManager";
import {getSchemaDataFromArray} from "../parsers/DynamicParser";
import {
    getListDataFromExcelTable,
    getListDataFromTextTable,
    getTypedData,
    getTypedDataFromListData,
} from "../parsers/TableParsers";
import {zodErrorOutput} from "../zodUtils";
import {upsertMany, zUpsertOutput} from "./upsertMany";

import {getObjectKeys} from "../../share/CommonFunctions";
import {TRPCContext} from "../trpc";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";
import {ZOD_INPUTS} from "../zods";

export async function importFromExcelFile(
    ctx: TRPCContext,
    schema: SCHEMA_TYPE,
    input: any
) {
    const file = getTempFiles(input) as STempFile;
    const rows = await getListDataFromExcelTable(file.path);
    return doImport(ctx, schema, rows, input.initData);
}

export async function importFromJsonArray(
    ctx: TRPCContext,
    schema: SCHEMA_TYPE,
    input: any[]
) {
    const schemaConfig = ctx.SchemaConfig ?? SCHEMAS_CONFIG[schema]
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
    return transformThenImport(ctx, schema, records);
}

export async function importFromText(
    ctx: TRPCContext,
    schema: SCHEMA_TYPE,
    input: any,
) {
    const rows = await getListDataFromTextTable(input.text);
    return doImport(ctx, schema, rows, input.initData);
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
    ctx: TRPCContext,
    schema: SCHEMA_TYPE,
    rows: any[],
    initData?: any
) {
  const records = getTypedDataFromListData(
      rows,
      ctx.SchemaConfig ?? SCHEMAS_CONFIG[schema],
      initData
  );
  console.log("Records:", records);
  return transformThenImport(
      ctx,
      schema,
      records
  );
}

async function transformThenImport(
    ctx: TRPCContext,
    schema: SCHEMA_TYPE,
    records: any[]
): Promise<z.infer<typeof zImportOutput>> {
    if (!records.length) {
        return {
            errors: [],
            updatedCount: 0,
            insertedCount: 0,
            insertedIds: [],
        };
    }
    const schemaConfig = ctx.SchemaConfig ?? SCHEMAS_CONFIG[schema];
    const zodInputSchema = ctx.ZodInput ?? ZOD_INPUTS[schema as keyof typeof ZOD_INPUTS]
    const data = await getSchemaDataFromArray(
        records,
        schemaConfig,
        zodInputSchema,
    );
    console.log("Try to upsert these records:", data.verifiedRecords);
    console.log("Errors:", data.errorRecords);
    const upsertResult = await upsertMany(ctx, schema,
        {
            key: schemaConfig.uniqueKeys,
            data: data.verifiedRecords,
        },
        true,
    );
    console.log("Upsert result", upsertResult);

    return {
        ...upsertResult,
        errors: [
            ...data.errorRecords,
            ...(upsertResult.errors ?? []).map((er) => ({
                idx: data.verifiedIndexs[er.idx], //TODO : tính lại idx
                errors: [{path: undefined, messages: [er.message]}],
            })),
        ],
    };
}