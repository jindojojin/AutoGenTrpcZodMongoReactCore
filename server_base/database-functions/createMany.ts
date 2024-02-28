import {TRPCContext} from "../trpc";

import {CREATED_BY, LAST_MODIFIED_BY} from "../../share/constants/database_fields";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";

export async function createMany(ctx: TRPCContext, schema: SCHEMA_TYPE, input: any[]) {
    return (await DATABASE_MODELS[schema].insertMany(input.map(v => ({
        ...v,
        [CREATED_BY]: ctx.auth?.userProfile._id,
        [LAST_MODIFIED_BY]: ctx.auth?.userProfile._id
    })))) as unknown as string[];
}