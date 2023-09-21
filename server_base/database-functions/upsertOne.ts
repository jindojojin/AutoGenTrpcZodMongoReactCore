import mongoose from "mongoose";
import {TRPCContext} from "../trpc";
import {LAST_MODIFIED_BY} from "../../share/constants/database_fields";

export async function upsertOne(ctx: TRPCContext, input: any, Model: mongoose.Model<any>) {
    const result = await Model.updateOne(
        {
            [input.key]: (input.data as any)[input.key],
        },
        {...input.data, [LAST_MODIFIED_BY]: ctx.auth?.userProfile._id},
        {upsert: true},
    );
    return result.acknowledged;
}