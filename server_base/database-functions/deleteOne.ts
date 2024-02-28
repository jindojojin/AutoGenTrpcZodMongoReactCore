import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";
import {updateOne} from "./updateOne";
import {TRPCContext} from "../trpc";
import {DELETED_BY} from "../../share/constants/database_fields";

export async function deleteOne(ctx: TRPCContext, schema: SCHEMA_TYPE, input: any) {
    if (SCHEMAS_CONFIG[schema].softDelete)
        return updateOne(ctx, schema, {
            id: input,
            data: {
                [DELETED_BY]: ctx.auth?.userProfile._id
            }
        })
    return DATABASE_MODELS[schema].findByIdAndDelete(input) as any;
}