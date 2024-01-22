import {TRPCContext} from "../trpc";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";
import { isSchemaType } from "../../share/types/DataTypes";
import { VIEW_TYPE } from "../../views/ViewTypes";
import { DATABASE_VIEWS } from "../mongoose/DatabaseViews";

export function findByIds(ctx: TRPCContext, schema: SCHEMA_TYPE|VIEW_TYPE, input: any) {
  return (isSchemaType(schema) ? DATABASE_MODELS[schema as SCHEMA_TYPE] : DATABASE_VIEWS[schema as VIEW_TYPE]).find(
      {_id: {$in: input.ids}},
      input.select,
      input.options,
  ).lean() as any;
}