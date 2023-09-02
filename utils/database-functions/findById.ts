import mongoose from "mongoose";

export function findById(input: any, Model: mongoose.Model<any>) {
  return Model.findById(input.id, input.select, input.options).lean() as any;
}
