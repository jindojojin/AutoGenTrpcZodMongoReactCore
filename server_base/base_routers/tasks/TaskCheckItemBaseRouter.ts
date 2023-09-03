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
export const TaskCheckItemBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM],SCHEMAS_CONFIG[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.TASK_CHECK_ITEM],DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM],SCHEMAS_CONFIG[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.TASK_CHECK_ITEM],DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM],SCHEMAS_CONFIG[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.TASK_CHECK_ITEM],DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM],SCHEMAS_CONFIG[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM], SCHEMAS_CONFIG[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK_CHECK_ITEM].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK_CHECK_ITEM]))
  });