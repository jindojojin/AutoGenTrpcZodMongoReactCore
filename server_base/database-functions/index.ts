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
import {getObjectKeys} from "../../share/CommonFunctions";
import _ from "lodash"

export const VIEW_FUNC = {
  findOne,
  findMany,
  findById,
  findByIds,
  textSearch,
  exportToExcelFile,
}
export const DB_FUNC = {
  ...VIEW_FUNC,
  createOne,
  createMany,
  deleteOne,
  deleteMany,
  updateOne,
  updateMany,
  upsertOne,
  upsertMany,
  importFromExcelFile,
  importFromJsonArray,
  importFromText,

};
export const excludeAllExcept = (arr: (keyof typeof DB_FUNC)[]) => {
  return _.difference(getObjectKeys(DB_FUNC), arr) as (keyof typeof DB_FUNC)[]
}
