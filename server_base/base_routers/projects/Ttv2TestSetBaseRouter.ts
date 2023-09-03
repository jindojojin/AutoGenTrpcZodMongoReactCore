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
export const Ttv2TestSetBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SET])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.TTV2_TEST_SET],DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SET])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.TTV2_TEST_SET],DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SET])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.TTV2_TEST_SET],DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET],SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SET])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET], SCHEMAS_CONFIG[SCHEMA_TYPE.TTV2_TEST_SET])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.TTV2_TEST_SET].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.TTV2_TEST_SET]))
  });