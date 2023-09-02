import mongoose from "mongoose";

export async function findMany(input: any, Model: mongoose.Model<any>) {
  const records = await Model.find(
    input.where ?? {},
    input.select,
    input.options as any,
  ).lean();
  const total = await Model.countDocuments(input.where ?? {});
  return {
    total,
    limit: input.options?.limit,
    skip: input.options?.skip,
    records: records as any,
  };
}
