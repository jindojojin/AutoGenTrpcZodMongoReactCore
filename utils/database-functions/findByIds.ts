import mongoose from "mongoose";

export function findByIds(input: any, Model: mongoose.Model<any>) {
  return Model.find(
    { _id: { $in: input.ids } },
    input.select,
    input.options,
  ).lean() as any;
}
