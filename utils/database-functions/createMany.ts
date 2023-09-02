import { Model } from "mongoose";

export async function createMany(input: any, Model: Model<any>) {
  return Model.insertMany(input) as unknown as string[];
}
