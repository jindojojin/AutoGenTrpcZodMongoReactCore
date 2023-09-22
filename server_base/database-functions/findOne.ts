import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";
import {TRPCContext} from "../trpc";

export function findOne(ctx: TRPCContext, schema: SCHEMA_TYPE, input: any) {
    console.log(`doFindOne with input ${input}`);
    return DATABASE_MODELS[schema].findOne(
        input.where ?? {},
        input.select,
        input.options,
    ).lean() as any;
}