import { ISchemaDefinition } from "./ISchemaDefinition";

export type ISchemaConfig<T> = {
  name: string;
  exportKeys: (keyof T)[]; // Những thuộc tính sẽ được export ra file excel
  searchKeys: (keyof T)[]; // Những thuộc tính dùng để tìm kiếm nhanh (phía client)
  uniqueKeys: (keyof T)[]; // Những thuộc tính để tìm kiếm bản ghi khi import
  relationKeys: (keyof T)[]; // Những thuộc tính dạng ObjectID link đến 1 Collection trong mongoDB
  fileTypeKeys: (keyof T)[]; // Những thuộc tính dạng FILE_TYPE
  fieldConfigs: ISchemaDefinition<T>;
};