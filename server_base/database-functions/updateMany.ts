import mongoose from "mongoose";

export async function updateMany(input: any, Model: mongoose.Model<any>) {
  const result = await Model.bulkWrite(
    input.map((value: any) => ({
      updateOne: {
        filter: { _id: value.id as any },
        update: value.data,
      },
    })),
  );
  if (result.ok) return input.map((v: any) => v.id);
  else throw result;
}
