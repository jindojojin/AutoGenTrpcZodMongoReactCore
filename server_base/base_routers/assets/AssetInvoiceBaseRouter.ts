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
export const AssetInvoiceBaseRouter = (config?: IProcedureConfig) =>
  router({
    createMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].CreateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].CreateManyOutput)
      .mutation(({ input }) => DB_FUNC.createMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    createOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].CreateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].CreateOneOutput)
      .mutation(({ input }) => DB_FUNC.createOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    deleteMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].DeleteMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].DeleteManyOutput)
      .mutation(({ input }) => DB_FUNC.deleteMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    deleteOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].DeleteOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].DeleteOneOutput)
      .mutation(({ input }) => DB_FUNC.deleteOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    exportToExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].ExportToExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].ExportToExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.exportToExcelFile(input,DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_INVOICE])),

    findById: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].FindById)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].FindByIdOutput)
      .query(({ input }) => DB_FUNC.findById(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    findByIds: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].FindByIds)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].FindByIdsOutput)
      .mutation(({ input }) => DB_FUNC.findByIds(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    findMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].FindMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].FindManyOutput)
      .mutation(({ input }) => DB_FUNC.findMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    findOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].FindOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].FindOneOutput)
      .query(({ input }) => DB_FUNC.findOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    importFromExcelFile: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].ImportFromExcelFile)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].ImportFromExcelFileOutput)
      .mutation(({ input }) => DB_FUNC.importFromExcelFile(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_INVOICE],DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_INVOICE])),

    importFromJsonArray: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].ImportFromJsonArray)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].ImportFromJsonArrayOutput)
      .mutation(({ input }) => DB_FUNC.importFromJsonArray(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_INVOICE],DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_INVOICE])),

    importFromText: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].ImportFromText)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].ImportFromTextOutput)
      .mutation(({ input }) => DB_FUNC.importFromText(input,ZOD_INPUTS[SCHEMA_TYPE.ASSET_INVOICE],DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE],SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_INVOICE])),

    textSearch: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].TextSearch)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].TextSearchOutput)
      .query(({ input }) => DB_FUNC.textSearch(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE], SCHEMAS_CONFIG[SCHEMA_TYPE.ASSET_INVOICE])),

    updateMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].UpdateMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].UpdateManyOutput)
      .mutation(({ input }) => DB_FUNC.updateMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    updateOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].UpdateOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].UpdateOneOutput)
      .mutation(({ input }) => DB_FUNC.updateOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    upsertMany: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].UpsertMany)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].UpsertManyOutput)
      .mutation(({ input }) => DB_FUNC.upsertMany(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE])),

    upsertOne: publicProcedure
      .input(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].UpsertOne)
      .output(ZOD_APIS[SCHEMA_TYPE.ASSET_INVOICE].UpsertOneOutput)
      .mutation(({ input }) => DB_FUNC.upsertOne(input, DATABASE_MODELS[SCHEMA_TYPE.ASSET_INVOICE]))
  });