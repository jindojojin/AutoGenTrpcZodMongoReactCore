import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { DATABASE_MODELS } from "../mongoose/DatabaseModels";
import { moveTempFileToDB } from "./Utils";

export async function createOne(input: any, schema: SCHEMA_TYPE) {
  await moveTempFileToDB(input, schema);
  const result = await DATABASE_MODELS[schema].create(input);
  return result._id;
}