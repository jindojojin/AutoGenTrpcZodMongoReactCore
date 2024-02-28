import {TRPCContext} from "../trpc";

import {LAST_MODIFIED_BY} from "../../share/constants/database_fields";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";

export async function updateMany(ctx: TRPCContext, schema: SCHEMA_TYPE, input: any) {
    const result = await DATABASE_MODELS[schema].bulkWrite(
        input.map((value: any) => ({
            updateOne: {
                filter: {_id: value.id as any},
                update: {...value.data, [LAST_MODIFIED_BY]: ctx.auth?.userProfile._id},
            },
        })),
    );
    if (result.ok) return input.map((v: any) => v.id);
    else throw result;
}