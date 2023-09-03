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
export const PlmDefectBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT],SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_DEFECT])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.PLM_DEFECT],DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT],SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_DEFECT])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.PLM_DEFECT],DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT],SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_DEFECT])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.PLM_DEFECT],DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT],SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_DEFECT])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT], SCHEMAS_CONFIG[SCHEMA_TYPE.PLM_DEFECT])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.PLM_DEFECT].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.PLM_DEFECT]))
  });