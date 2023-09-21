import mongoose from "mongoose";
import {TRPCContext} from "../trpc";
import {LAST_MODIFIED_BY} from "../auto-logs/AutoLogSchema";

export async function createMany(ctx: TRPCContext,input: any[], Model: mongoose.Model<any>) {
    return (await Model.insertMany(input.map(v => ({
        ...v,
        [LAST_MODIFIED_BY]: ctx.auth?.userProfile._id
    })))) as unknown as string[];
}