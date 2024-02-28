import {TRPCContext} from "../trpc";
import {LAST_MODIFIED_BY} from "../../share/constants/database_fields";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";

export async function upsertOne(ctx: TRPCContext, schema: SCHEMA_TYPE, input: any) {
    const result = await DATABASE_MODELS[schema].updateOne(
        {
            [input.key]: (input.data as any)[input.key],
        },
        {...input.data, [LAST_MODIFIED_BY]: ctx.auth?.userProfile._id},
        {upsert: true},
    );
    return result.acknowledged;
}