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
export const UserBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.USER],SCHEMAS_CONFIG[SCHEMA_TYPE.USER])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.USER],DATABASE_MODELS[SCHEMA_TYPE.USER],SCHEMAS_CONFIG[SCHEMA_TYPE.USER])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.USER],DATABASE_MODELS[SCHEMA_TYPE.USER],SCHEMAS_CONFIG[SCHEMA_TYPE.USER])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.USER],DATABASE_MODELS[SCHEMA_TYPE.USER],SCHEMAS_CONFIG[SCHEMA_TYPE.USER])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.USER], SCHEMAS_CONFIG[SCHEMA_TYPE.USER])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.USER])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.USER].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.USER].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.USER]))
  });