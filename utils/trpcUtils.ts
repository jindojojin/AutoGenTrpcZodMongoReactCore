import { ProcedureBuilder } from "@trpc/server";

export interface IProcedureConfig {
  findOne?: ProcedureBuilder<any>;
  findMany?: ProcedureBuilder<any>;
  textSearch?: ProcedureBuilder<any>;
  findById?: ProcedureBuilder<any>;
  findByIds?: ProcedureBuilder<any>;
  deleteOne?: ProcedureBuilder<any>;
  deleteMany?: ProcedureBuilder<any>;
  updateOne?: ProcedureBuilder<any>;
  updateMany?: ProcedureBuilder<any>;
  createOne?: ProcedureBuilder<any>;
  createMany?: ProcedureBuilder<any>;
  upsertOne?: ProcedureBuilder<any>;
  upsertMany?: ProcedureBuilder<any>;
  importFromExcelFile?: ProcedureBuilder<any>;
  importFromText?: ProcedureBuilder<any>;
  exportToExcelFile?: ProcedureBuilder<any>;
}
