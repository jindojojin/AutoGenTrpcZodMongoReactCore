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
export const AssetPropertyLogBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PROPERTY_LOG],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PROPERTY_LOG],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PROPERTY_LOG],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG], SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY_LOG].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY_LOG]))
  });