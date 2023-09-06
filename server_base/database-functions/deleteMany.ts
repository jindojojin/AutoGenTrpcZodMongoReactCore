import mongoose from "mongoose";

export function deleteMany(input: any, Model: mongoose.Model<any>) {
  return Model.deleteMany({
    _id: { $in: input },
  }) as any;
}