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
export const AssetCategoryBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_CATEGORY])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_CATEGORY],DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_CATEGORY])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_CATEGORY],DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_CATEGORY])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_CATEGORY],DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_CATEGORY])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY], SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_CATEGORY])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_CATEGORY].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_CATEGORY]))
  });