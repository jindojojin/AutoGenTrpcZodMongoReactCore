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
export const PlmCodeBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE],SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_CODE])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.PLM_CODE],DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE],SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_CODE])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.PLM_CODE],DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE],SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_CODE])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.PLM_CODE],DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE],SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_CODE])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE], SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_CODE])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_CODE].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_CODE]))
  });