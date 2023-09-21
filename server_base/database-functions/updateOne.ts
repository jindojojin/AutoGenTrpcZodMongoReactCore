import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {moveTempFileToDB} from "./Utils";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";
import {TRPCContext} from "../trpc";
import {LAST_MODIFIED_BY} from "../../share/constants/database_fields";

export async function updateOne(ctx: TRPCContext, input: any, schema: SCHEMA_TYPE) {
    input.data = await moveTempFileToDB(input.data, schema)
    const query = await DATABASE_MODELS[schema].findByIdAndUpdate(input.id, {
        ...input.data,
        [LAST_MODIFIED_BY]: ctx.auth?.userProfile._id
    }).lean();
    return input.id;
}