import mongoose from "mongoose";
import {TRPCContext} from "../trpc";
import {LAST_MODIFIED_BY} from "../auto-logs/AutoLogSchema";

export async function updateMany(ctx: TRPCContext, input: any, Model: mongoose.Model<any>) {
    const result = await Model.bulkWrite(
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