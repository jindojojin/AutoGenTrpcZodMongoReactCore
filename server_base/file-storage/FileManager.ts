import * as fs from "fs";
import { existsSync, mkdirSync } from "fs";
import _ from "lodash";
import mongoose, {
  Schema,
  SchemaDefinition,
  SchemaDefinitionType,
} from "mongoose";
import path from "path";
import { v4 as uuid } from "uuid";
import { NODE_CACHE } from "../CacheManager";

export const STORAGE_FOLDER_PATH =
  process.env.STORAGE_FOLDER_PATH ||
  path.join(__dirname, "/StorageServiceData");
if (!existsSync(STORAGE_FOLDER_PATH))
  mkdirSync(STORAGE_FOLDER_PATH, { recursive: true });

export const TEMP_FOLDER_PATH =
  process.env.TEMP_FOLDER_PATH || path.resolve(STORAGE_FOLDER_PATH, "TempData");
if (!existsSync(TEMP_FOLDER_PATH))
  mkdirSync(TEMP_FOLDER_PATH, { recursive: true });

export type STempFile = {
  path: string;
  name: string;
};

export type SFile = Pick<
  Express.Multer.File,
  "path" | "mimetype" | "size" | "filename" | "originalname"
> & {
  _id: string;
  type: string;
  owner: string;
  authorizedViewers: string[];
};

export const SFileCollectionName = "StorageFile";

const SFileSchema = new Schema<SchemaDefinition<SchemaDefinitionType<SFile>>>(
  {
    type: String,
    owner: String,
    authorizedViewers: [String],

    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const SFileModel = mongoose.model(SFileCollectionName, SFileSchema);

export async function saveFiles(
  files: Express.Multer.File | Express.Multer.File[],
  type: string,
  owner: string | null = null,
  authorizedViewers: string[] = [],
) {
  const docs = (Array.isArray(files) ? files : [files]).map(
    (file) =>
      new SFileModel({
        ..._.pick(file, [
          "filename",
          "path",
          "size",
          "mimetype",
          "originalname",
        ]),
        type,
        owner,
        authorizedViewers,
      }),
  );
  const saveResult = await SFileModel.bulkSave(docs);
  const ids = Object.values(saveResult.insertedIds);
  return Array.isArray(files) ? (ids as string[]) : (ids[0] as string);
}

export async function getFiles(fileIDs: string | string[]) {
  const result = await SFileModel.find({
    _id: { $in: Array.isArray(fileIDs) ? fileIDs : [fileIDs] },
  });
  return Array.isArray(fileIDs) ? (result as SFile[]) : (result[0] as SFile);
}

export async function removeFiles(fileIDs: string | string[]) {
  const files = await getFiles(fileIDs);
  const file_arr = _.isArray(files) ? files : [files];
  await SFileModel.deleteMany({
    _id: { $in: file_arr.map((f) => f._id) },
  });

  file_arr.forEach((file) => fs.rmSync(file.path));
}

/**
 * Thêm file vào danh sách file tạm, tự xoá sau 1 khoảng thời gian
 * @param files
 * @param expiredAfterMinutes
 */
export function addTempFiles(
  files: STempFile | STempFile[],
  expiredAfterMinutes: number = 5,
) {
  const ids = (Array.isArray(files) ? files : [files]).map((file) => {
    const tempID = uuid();
    NODE_CACHE.set(tempID, file, expiredAfterMinutes * 60);
    delayDelete(file.path, expiredAfterMinutes);
    return tempID;
  });
  return Array.isArray(files) ? ids : ids[0];
}

export function getTempFiles(tempIDs: string | string[]) {
  const files = (Array.isArray(tempIDs) ? tempIDs : [tempIDs]).map((id) =>
    NODE_CACHE.get<STempFile>(id),
  );
  return Array.isArray(tempIDs) ? _.compact(files) : _.compact(files)[0];
}

export function initTempFileSlot(filename?: string): STempFile {
  return {
    path: path.resolve(
      TEMP_FOLDER_PATH,
      `${uuid().replaceAll("-", "")}_${filename}`,
    ),
    name: filename ?? uuid(),
  };
}

/**
 * Tự động xoá file sau 1 khoảng thời gian
 * @param filePath
 * @param delayTime (minutes)
 */
export function delayDelete(filePath: string, delayTime: number) {
  setTimeout(
    () => {
      try {
        fs.rmSync(filePath);
      } catch (e) {
        return;
      }
    },
    delayTime * 60 * 1000,
  );
}
