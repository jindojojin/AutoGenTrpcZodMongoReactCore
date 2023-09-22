import {TRPCContext} from "../trpc";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";

export function findByIds(ctx: TRPCContext, schema: SCHEMA_TYPE, input: any) {
  return DATABASE_MODELS[schema].find(
      {_id: {$in: input.ids}},
      input.select,
      input.options,
  ).lean() as any;
}