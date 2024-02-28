import mongoose from "mongoose";
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { SCHEMAS_CONFIG } from "../../share/schema_configs";
import { saveTempFiles } from "../file-storage/FileManager";
import { DATABASE_MODELS } from "../mongoose/DatabaseModels";

export async function moveTempFileToDB(
  input: any | any[],
  schema: SCHEMA_TYPE,
) {
  const FileTypeFields = SCHEMAS_CONFIG[schema].fileTypeKeys;
  const Result = Array.isArray(input) ? input : [input];
  for (let i = 0; i < FileTypeFields.length; i++) {
    const key = FileTypeFields[i];
    console.log("Handle ");
    for (let idx = 0; idx < Result.length; idx++) {
      if (Result[idx][key])
        Result[idx][key] = await saveTempFiles(Result[idx][key]);
    }
  }
  console.log("Move temp file (if exist) to DB done", Result);
  return Array.isArray(input) ? Result : Result[0];
}

export function $joinTable(
  path: string,
  schema: SCHEMA_TYPE,
  as?: string,
  foreignField?: string,
) {
  return {
    $lookup: {
      from: DATABASE_MODELS[schema].collection.name,
      localField: path,
      foreignField: foreignField ?? "_id",
      as: as ?? path,
    },
  };
}

export function $unwind(path: string) {
  return {
    $unwind: {
      path: `$${path}`,
      preserveNullAndEmptyArrays: true,
    },
  };
}

export function $manyToOneJoin(
  srcPath: string,
  tgSchema: SCHEMA_TYPE,
  as?: string,
  onlyIDMode?: boolean
) {
  const fieldname = as ?? srcPath
  return [
    {
      $lookup: {
        from: DATABASE_MODELS[tgSchema].collection.name,
        localField: srcPath,
        foreignField: "_id",
        as: fieldname,
      },
    },
    $unwind(fieldname),
    onlyIDMode ? {
      $set: {
        [fieldname]: `$${fieldname}._id`
      }
    } : null
  ];
}

export function $oneToManyJoin(
  tgPath: string,
  tgSchema: SCHEMA_TYPE,
  as?: string,
  onlyIDMode?: boolean,
  localField:string = "_id"
) {
  const fieldname = as ?? DATABASE_MODELS[tgSchema].collection.name
  return [{
    $lookup: {
      from: DATABASE_MODELS[tgSchema].collection.name,
      localField: localField,
      foreignField: tgPath,
      as: fieldname,
    },
  },
  $unwind(fieldname),
  onlyIDMode ? {
    $set: {
      [fieldname]: `$${fieldname}._id`
    }
  } : null];
}

export function $objectIdToString(paths?: any[]) {
  return paths?.length
    ? {
      $set: paths.reduce(
        (acc, path) => ({ ...acc, [path]: { $toString: `$${path}` } }),
        {},
      ),
    }
    : undefined;
}

export function $stringToObjectId(paths?: any[]) {
  return paths?.length
    ? {
      $set: paths.reduce(
        (acc, path) => ({ ...acc, [path]: { $toObjectId: `$${path}` } }),
        {},
      ),
    }
    : undefined;
}

export async function findOneOrCreateNew<T>(
  Model: mongoose.Model<T>,
  query: any,
) {
  const document = await Model.findOne(query).exec();
  return document ? document : new Model();
}