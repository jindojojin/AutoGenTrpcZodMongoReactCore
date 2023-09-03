import mongoose from "mongoose";

export async function createOne(input: any, Model: mongoose.Model<any>) {
  const result = await Model.create(input);
  return result._id;
}
