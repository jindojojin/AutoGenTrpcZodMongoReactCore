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
export const TaskBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.TASK],SCHEMAS_CONFIG[SCHEMA_TYPE.TASK])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.TASK],DATABASE_MODELS[SCHEMA_TYPE.TASK],SCHEMAS_CONFIG[SCHEMA_TYPE.TASK])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.TASK],DATABASE_MODELS[SCHEMA_TYPE.TASK],SCHEMAS_CONFIG[SCHEMA_TYPE.TASK])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.TASK],DATABASE_MODELS[SCHEMA_TYPE.TASK],SCHEMAS_CONFIG[SCHEMA_TYPE.TASK])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.TASK], SCHEMAS_CONFIG[SCHEMA_TYPE.TASK])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.TASK])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TASK].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TASK].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.TASK]))
  });