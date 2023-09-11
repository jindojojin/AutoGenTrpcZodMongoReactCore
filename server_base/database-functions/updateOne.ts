import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {moveTempFileToDB} from "./Utils";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";

export async function updateOne(input: any, schema: SCHEMA_TYPE) {
    input.data = await moveTempFileToDB(input.data, schema)
    const query = await DATABASE_MODELS[schema].findByIdAndUpdate(input.id, input.data).lean();
    return input.id;
}