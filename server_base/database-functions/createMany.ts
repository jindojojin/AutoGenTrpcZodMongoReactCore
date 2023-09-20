import mongoose from "mongoose";

export async function createMany(input: any, Model: mongoose.Model<any>) {
    return (await Model.insertMany(input)) as unknown as string[];
}