import {ISchemaDefinition} from "./ISchemaDefinition";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

export type ISchemaConfig<T> = {
  name: string;
  uniqueKeys: (keyof T)[]; // Những thuộc tính để tìm kiếm bản ghi khi import
  exportKeys: (keyof T)[]; // Những thuộc tính sẽ được export ra file excel
  searchKeys: (keyof T)[]; // Những thuộc tính dùng để tìm kiếm nhanh (phía client)
  relationKeys: (keyof T)[]; // Những thuộc tính dạng ObjectID link đến 1 Collection trong mongoDB
  fileTypeKeys: (keyof T)[]; // Những thuộc tính dạng FILE_TYPE
  fieldConfigs: ISchemaDefinition<T>;
  dynamicConfig?:{
    category: SCHEMA_TYPE
  }
};