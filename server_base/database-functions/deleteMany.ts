import {TRPCContext} from "../trpc";
import {DELETED_BY} from "../../share/constants/database_fields";
import {updateMany} from "./updateMany";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";

export function deleteMany(ctx: TRPCContext, schema: SCHEMA_TYPE, input: any[]) {
    if (SCHEMAS_CONFIG[schema].softDelete)
        return updateMany(ctx, schema, input.map(id => ({
            id,
            data: {
                [DELETED_BY]: ctx.auth?.userProfile._id
            }
        })));
    else
        return DATABASE_MODELS[schema].deleteMany({
            _id: {$in: input},
        }) as any;
}