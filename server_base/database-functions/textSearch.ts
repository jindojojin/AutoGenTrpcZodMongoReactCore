import mongoose from "mongoose";
import {ISchemaConfig} from "../../share/types/ISchemaConfig";
import {findMany} from "./findMany";

export async function textSearch(
  input: any,
  Model: mongoose.Model<any>,
  SchemaConfig: ISchemaConfig<any>,
) {
  return findMany(
    {
      ...input,
      where: SchemaConfig.searchKeys.length
        ? {
            $or: SchemaConfig.searchKeys.map((key) => ({
              [key]: { $regex: input.text },
            })),
          }
        : {},
    },
    Model,SchemaConfig
  );
}