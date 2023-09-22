import mongoose from "mongoose";
import {TRPCContext} from "../trpc";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";

export function findById(ctx:TRPCContext,schema:SCHEMA_TYPE,input: any) {
  return DATABASE_MODELS[schema].findById(input.id, input.select, input.options).lean() as any;
}