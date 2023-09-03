/**
 * This file is auto generated _ do not fix manually
 */
import _ from "lodash";
import { publicProcedure, router } from "../../trpc";
import { DB_FUNC } from "../../database-functions";
import { SCHEMA_TYPE } from "../../../share/types/DataTypes";
import { MONGOOSE_SCHEMA } from "../../mongoose/MongooseSchemas";
import { DATABASE_MODELS } from "../../mongoose/DatabaseModels";
import { SCHEMAS_CONFIG } from "../../../share/schema_configs";
import {
  dynamicTableProcedure,
  DynamicTableProcedureParams,
} from "../../trpc-dynamic-routes/utils/dynamicTableProcedure";
import { IProcedureConfig } from "../../trpcUtils";

const DynamicParams: DynamicTableProcedureParams = {
  procedure: publicProcedure,
  DataModel: DATABASE_MODELS[SCHEMA_TYPE.ASSET],
  MongoDataSchema: MONGOOSE_SCHEMA[SCHEMA_TYPE.ASSET],
  PropertyModel: DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY],
  CategoryModel: DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY],
  fixedFields: _.omit(SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET].fieldConfigs, ["_id"]),
};

export const AssetBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: dynamicTableProcedure(DynamicParams,
      "CreateMany",
      "CreateManyOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.createMany(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    createOne: dynamicTableProcedure(DynamicParams,
      "CreateOne",
      "CreateOneOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.createOne(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    deleteMany: dynamicTableProcedure(DynamicParams,
      "DeleteMany",
      "DeleteManyOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.deleteMany(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    deleteOne: dynamicTableProcedure(DynamicParams,
      "DeleteOne",
      "DeleteOneOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.deleteOne(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    exportToExcelFile: dynamicTableProcedure(DynamicParams,
      "ExportToExcelFile",
      "ExportToExcelFileOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.exportToExcelFile(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET],ctx.SchemaConfig);
      return ctx.ZodOutput.parseAsync(result);
    }),

    findById: dynamicTableProcedure(DynamicParams,
      "FindById",
      "FindByIdOutput"
    ).query(async ({ ctx, input }) => {
      const result = await DB_FUNC.findById(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    findByIds: dynamicTableProcedure(DynamicParams,
      "FindByIds",
      "FindByIdsOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.findByIds(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    findMany: dynamicTableProcedure(DynamicParams,
      "FindMany",
      "FindManyOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.findMany(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    findOne: dynamicTableProcedure(DynamicParams,
      "FindOne",
      "FindOneOutput"
    ).query(async ({ ctx, input }) => {
      const result = await DB_FUNC.findOne(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    importFromExcelFile: dynamicTableProcedure(DynamicParams,
      "ImportFromExcelFile",
      "ImportFromExcelFileOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.importFromExcelFile(input.input,ctx.ZodBase.input,DATABASE_MODELS[SCHEMA_TYPE.ASSET],ctx.SchemaConfig);
      return ctx.ZodOutput.parseAsync(result);
    }),

    importFromJsonArray: dynamicTableProcedure(DynamicParams,
      "ImportFromJsonArray",
      "ImportFromJsonArrayOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.importFromJsonArray(input.input,ctx.ZodBase.input,DATABASE_MODELS[SCHEMA_TYPE.ASSET],ctx.SchemaConfig);
      return ctx.ZodOutput.parseAsync(result);
    }),

    importFromText: dynamicTableProcedure(DynamicParams,
      "ImportFromText",
      "ImportFromTextOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.importFromText(input.input,ctx.ZodBase.input,DATABASE_MODELS[SCHEMA_TYPE.ASSET],ctx.SchemaConfig);
      return ctx.ZodOutput.parseAsync(result);
    }),

    textSearch: dynamicTableProcedure(DynamicParams,
      "TextSearch",
      "TextSearchOutput"
    ).query(async ({ ctx, input }) => {
      const result = await DB_FUNC.textSearch(input.input,DATABASE_MODELS[SCHEMA_TYPE.ASSET],ctx.SchemaConfig);
      return ctx.ZodOutput.parseAsync(result);
    }),

    updateMany: dynamicTableProcedure(DynamicParams,
      "UpdateMany",
      "UpdateManyOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.updateMany(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    updateOne: dynamicTableProcedure(DynamicParams,
      "UpdateOne",
      "UpdateOneOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.updateOne(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    upsertMany: dynamicTableProcedure(DynamicParams,
      "UpsertMany",
      "UpsertManyOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.upsertMany(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    }),

    upsertOne: dynamicTableProcedure(DynamicParams,
      "UpsertOne",
      "UpsertOneOutput"
    ).mutation(async ({ ctx, input }) => {
      const result = await DB_FUNC.upsertOne(input.input, DATABASE_MODELS[SCHEMA_TYPE.ASSET]);
      return ctx.ZodOutput.parseAsync(result);
    })
  });