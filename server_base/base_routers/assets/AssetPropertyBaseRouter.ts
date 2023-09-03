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
export const AssetPropertyBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PROPERTY],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PROPERTY],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_PROPERTY],DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY], SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_PROPERTY])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_PROPERTY].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_PROPERTY]))
  });