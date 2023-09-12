import {createMany} from "./createMany";
import {findMany} from "./findMany";
import {findOne} from "./findOne";
import {createOne} from "./createOne";
import {findById} from "./findById";
import {findByIds} from "./findByIds";
import {deleteOne} from "./deleteOne";
import {deleteMany} from "./deleteMany";
import {textSearch} from "./textSearch";
import {updateOne} from "./updateOne";
import {updateMany} from "./updateMany";
import {upsertOne} from "./upsertOne";
import {upsertMany} from "./upsertMany";
import {importFromExcelFile, importFromJsonArray, importFromText,} from "./importMany";
import {exportToExcelFile} from "./exportMany";

export const DB_FUNC = {
  createOne,
  createMany,
  findOne,
  findMany,
  findById,
  findByIds,
  deleteOne,
  deleteMany,
  textSearch,
  updateOne,
  updateMany,
  upsertOne,
  upsertMany,
  importFromExcelFile,
  importFromJsonArray,
  importFromText,
  exportToExcelFile,
};