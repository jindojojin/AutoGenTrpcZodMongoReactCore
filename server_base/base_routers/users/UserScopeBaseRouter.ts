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
export const UserScopeBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE],SCHEMAS_CONFIG[SCHEMA_TYPE.USER_SCOPE])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.USER_SCOPE],DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE],SCHEMAS_CONFIG[SCHEMA_TYPE.USER_SCOPE])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.USER_SCOPE],DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE],SCHEMAS_CONFIG[SCHEMA_TYPE.USER_SCOPE])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.USER_SCOPE],DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE],SCHEMAS_CONFIG[SCHEMA_TYPE.USER_SCOPE])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE], SCHEMAS_CONFIG[SCHEMA_TYPE.USER_SCOPE])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER_SCOPE].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER_SCOPE]))
  });