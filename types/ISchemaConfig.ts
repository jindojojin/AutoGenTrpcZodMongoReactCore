import { ISchemaDefinition } from "./ISchemaDefinition";

export type ISchemaConfig<T> = {
  name: string;
  importKeys: (keyof T)[];
  exportKeys: (keyof T)[];
  searchKeys: (keyof T)[];
  uniqueKeys: (keyof T)[];
  relationKeys: (keyof T)[];
  fieldConfigs: ISchemaDefinition<T>;
};