import mongoose from "mongoose";

export async function deleteOne(input: any, Model: mongoose.Model<any>) {
  return Model.findByIdAndDelete(input) as any;
}
