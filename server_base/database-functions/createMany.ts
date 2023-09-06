import mongoose from "mongoose";

export function createMany(input: any, Model: mongoose.Model<any>) {
    return Model.insertMany(input) as unknown as string[];
}