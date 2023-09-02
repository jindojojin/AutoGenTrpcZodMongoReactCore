import mongoose from "mongoose";

export async function upsertOne(input: any, Model: mongoose.Model<any>) {
  const result = await Model.updateOne(
    {
      [input.key]: (input.data as any)[input.key],
    },
    input.data,
    { upsert: true },
  );
  return result.acknowledged;
}
