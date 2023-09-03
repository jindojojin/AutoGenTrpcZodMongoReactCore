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
export const AssetPicLogBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC_LOG])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PIC_LOG],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC_LOG])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PIC_LOG],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC_LOG])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PIC_LOG],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC_LOG])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG], SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC_LOG])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC_LOG].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC_LOG]))
  });