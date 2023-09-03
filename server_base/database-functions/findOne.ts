import mongoose from "mongoose";

export function findOne(input: any, Model: mongoose.Model<any>) {
  console.log(`doFindOne with input ${input}`);
  return Model.findOne(
    input.where ?? {},
    input.select,
    input.options,
  ).lean() as any;
}
