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
export const Ttv2TestcaseBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TESTCASE])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.TTV2_TESTCASE],DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TESTCASE])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.TTV2_TESTCASE],DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TESTCASE])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.TTV2_TESTCASE],DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TESTCASE])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE], SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TESTCASE])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TESTCASE].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TESTCASE]))
  });