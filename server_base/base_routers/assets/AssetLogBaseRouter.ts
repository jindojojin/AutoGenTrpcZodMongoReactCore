/**
 * This file is auto generated _ do not fix manually
 */
import { publicProcedure, router } from "../../trpc";
import { ZOD_APIS, ZOD_INPUTS } from "../../zods";
import { DB_FUNC } from "../../database-functions";
import { SCHEMA_TYPE } from "../../../share/types/DataTypes";
import { DATABASE_MODELS } from "../../mongoose/DatabaseModels";
import { SCHEMAS_CONFIG } from "../../../share/schema_configs";
import { IProcedureConfig } from "../../trpcUtils";
export const AssetLogBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_LOG])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_LOG],DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_LOG])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_LOG],DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_LOG])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_LOG],DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_LOG])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG], SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_LOG])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_LOG].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_LOG]))
  });