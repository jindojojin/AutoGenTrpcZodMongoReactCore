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
export const ProjectBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.PROJECT],SCHEMAS_CONFIG[SCHEMA_TYPE.PROJECT])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.PROJECT],DATABASE_MODELS[SCHEMA_TYPE.PROJECT],SCHEMAS_CONFIG[SCHEMA_TYPE.PROJECT])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.PROJECT],DATABASE_MODELS[SCHEMA_TYPE.PROJECT],SCHEMAS_CONFIG[SCHEMA_TYPE.PROJECT])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.PROJECT],DATABASE_MODELS[SCHEMA_TYPE.PROJECT],SCHEMAS_CONFIG[SCHEMA_TYPE.PROJECT])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT], SCHEMAS_CONFIG[SCHEMA_TYPE.PROJECT])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PROJECT].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PROJECT].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.PROJECT]))
  });