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
export const Ttv2TestSuiteBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.TTV2_TEST_SUITE],DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.TTV2_TEST_SUITE],DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.TTV2_TEST_SUITE],DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE], SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SUITE].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SUITE]))
  });