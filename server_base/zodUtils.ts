import {z, ZodTypeAny} from "zod";
import mongoose from "mongoose";

import {getObjectKeys} from "../share/CommonFunctions";

export function zObjectId() {
  return z.custom<string>(
    (val) =>
      mongoose.Types.ObjectId.isValid(val as any) ||
      mongoose.Types.ObjectId.isValid(val?.["_id" as keyof {}] as any),
  );
}

export function zTempFileId() {
  return z.custom<string>((val) => String(val).split("-").length == 5);
}

//// Query operator, for each Basic Field only, to build for a object => auto gen code.
export const ZodMongoQuery = {
  z$logical<T extends ZodTypeAny>(schema: T) {
    return z
      .object({
        $or: z.array(schema),
        $and: z.array(schema),
        $nor: z.array(schema),
        $not: z.array(schema),
      })
      .partial();
  },

  z$comparison<T extends ZodTypeAny>(schema: T) {
    return z
      .object({
        $gt: schema,
        $lt: schema,
        $eq: schema,
        $ne: schema,
        $gte: schema,
        $lte: schema,
        $in: z.array(schema),
        $nin: z.array(schema), // not in
        $regex: z.string(),
      })
      .partial();
  },

  z$query<T extends ZodTypeAny>(schema: T) {
    return z.union([schema, this.z$comparison(schema), this.z$logical(schema)]);
  },
  z$array<T extends ZodTypeAny>(schema: T) {
    return z
      .object({
        $all: z.array(schema), //https://www.mongodb.com/docs/v6.0/reference/operator/query/all/#mongodb-query-op.-all
        $elemMatch: this.z$query(schema),
        $size: z.number(),
      })
      .partial();
  },

  z$arrayQuery<T extends ZodTypeAny>(schema: T) {
    //https://www.mongodb.com/docs/v6.0/tutorial/query-arrays/
    return z.union([schema, z.array(schema), this.z$array(schema)]);
  },
};

export const zodErrorOutput = z.object({
  path: z.any(),
  messages: z.string().array(),
});

export function verifyWithZod<T>(
  zodSchema: ZodTypeAny,
  rawData: T,
):
  | { success: true; data: T }
  | { success: false; errors: z.infer<typeof zodErrorOutput>[] } {
  const parseResult = zodSchema.safeParse(rawData);
  if (parseResult.success) return parseResult;
  else {
    const zodErr = parseResult.error.format() as any;
    const errors: { path: keyof T; messages: any }[] = [];
    getObjectKeys(rawData).forEach((k) => {
      if (zodErr[k]) {
        if (Array.isArray(rawData[k])) {
          const messages: string[] = [];
          for (let idx in zodErr[k]) {
            if (!isNaN(Number(idx))) {
              messages.push(
                `${(rawData[k] as unknown as any[])[Number(idx)]}: ${
                  zodErr[k][idx]._errors
                }`,
              );
            }
          }
          errors.push({ path: k, messages });
        } else {
          errors.push({ path: k, messages: zodErr[k]._errors });
        }
      }
    });
    console.log(errors);
    return { success: false, errors };
  }
}