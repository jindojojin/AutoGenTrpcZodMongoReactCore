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
export const AssetPicBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PIC],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PIC],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PIC],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC], SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PIC])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PIC].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PIC]))
  });