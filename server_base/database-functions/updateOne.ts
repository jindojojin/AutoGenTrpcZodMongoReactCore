import mongoose from "mongoose";

export async function updateOne(input: any, Model: mongoose.Model<any>) {
  const query = await Model.findByIdAndUpdate(input.id, input.data).lean();
  return input.id;
}
