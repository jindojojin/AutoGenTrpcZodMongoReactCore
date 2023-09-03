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
export const TestProjectBaseRouter = (config?: IProcedureConfig) =>
  router({
    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT],SCHEMAS_CONFIG[SCHEMA_TYPE.TEST_PROJECT])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.TEST_PROJECT],DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT],SCHEMAS_CONFIG[SCHEMA_TYPE.TEST_PROJECT])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.TEST_PROJECT],DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT],SCHEMAS_CONFIG[SCHEMA_TYPE.TEST_PROJECT])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.TEST_PROJECT],DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT],SCHEMAS_CONFIG[SCHEMA_TYPE.TEST_PROJECT])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT], SCHEMAS_CONFIG[SCHEMA_TYPE.TEST_PROJECT])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TEST_PROJECT].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.TEST_PROJECT]))
  });