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
export const ScopeBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.SCOPE],SCHEMAS_CONFIG[SCHEMA_TYPE.SCOPE])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.SCOPE],DATABASE_MODELS[SCHEMA_TYPE.SCOPE],SCHEMAS_CONFIG[SCHEMA_TYPE.SCOPE])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.SCOPE],DATABASE_MODELS[SCHEMA_TYPE.SCOPE],SCHEMAS_CONFIG[SCHEMA_TYPE.SCOPE])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.SCOPE],DATABASE_MODELS[SCHEMA_TYPE.SCOPE],SCHEMAS_CONFIG[SCHEMA_TYPE.SCOPE])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE], SCHEMAS_CONFIG[SCHEMA_TYPE.SCOPE])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.SCOPE].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.SCOPE].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.SCOPE]))
  });