import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";
import {moveTempFileToDB} from "./Utils";
import {TRPCContext} from "../trpc";

import {CREATED_BY, LAST_MODIFIED_BY} from "../../share/constants/database_fields";

export async function createOne(ctx: TRPCContext, schema: SCHEMA_TYPE, input: any) {
    await moveTempFileToDB(input, schema);
    const result = await DATABASE_MODELS[schema].create({
        ...input,
        [CREATED_BY]: ctx.auth?.userProfile._id,
        [LAST_MODIFIED_BY]: ctx.auth?.userProfile._id
    });
    return result._id;
}