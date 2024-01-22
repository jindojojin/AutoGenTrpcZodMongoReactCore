import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { getObjectKeys } from "../../share/CommonFunctions";
import { createFolderIfNotExist, getSchemaName, getTypeEnumText } from "../genUtils";

import { GenConfig } from "../../schemas";
import { ViewGenConfig } from "../../views";
import { VIEW_TYPE } from "../../views/ViewTypes";

export function autoGenMongooseSchema(outDir:string,GenList: Record<SCHEMA_TYPE, GenConfig>) {
  // const importLines: string[] = [];
  const exportLines: string[] = [];
  const importTypes: string[] = [];
  const exportModelMappingLines: string[] = [];
  getObjectKeys(GenList).map((_key) => {
    const key = _key as SCHEMA_TYPE;
    const ModuleName = getSchemaName(key).SchemaName;
    importTypes.push(ModuleName);
    exportLines.push(
      `export const ${ModuleName}MongooseSchema = getSchemaFromFieldConfigs\<${ModuleName}\>({...GenList[${getTypeEnumText(
        key,
      )}].schema, ...DefaultSchema} as any);`,
    );
    exportModelMappingLines.push(
      `[${getTypeEnumText(key)}] : ${ModuleName}MongooseSchema,`,
    );
  });

  const filePath = path.resolve(
    `${outDir}/mongoose/MongooseSchemas.ts`,
  );
  createFolderIfNotExist(filePath);
  const template = readFileSync(
    path.resolve("src/templates/MongooseSchemaTemplate.txt"),
  ).toString();
  const fileContent = template
    // .replaceAll("{{imports}}", importLines.join("\n"))
    .replaceAll("{{exports}}", exportLines.join("\n"))
    .replaceAll("{{importTypes}}", importTypes.join(","))
    .replaceAll("{{exportModelMapping}}", exportModelMappingLines.join("\n"));
  writeFileSync(filePath, fileContent);
}

export function autoGenMongooseSchemaForView(outDir:string,GenList: Record<VIEW_TYPE, ViewGenConfig>) {
  // const importLines: string[] = [];
  const exportLines: string[] = [];
  const importTypes: string[] = [];
  const exportModelMappingLines: string[] = [];
  getObjectKeys(GenList).map((key) => {
    const ModuleName = getSchemaName(key).SchemaName;
    importTypes.push(ModuleName);
    exportLines.push(
      `export const ${ModuleName}MongooseSchema = getSchemaFromFieldConfigs\<${ModuleName}\>({...ViewGenList[${getTypeEnumText(
        key,
      )}].view.schema, ...DefaultSchema} as any);`,
    );
    exportModelMappingLines.push(
      `[${getTypeEnumText(key)}] : ${ModuleName}MongooseSchema,`,
    );
  });

  const filePath = path.resolve(
    `${outDir}/mongoose/MongooseViews.ts`,
  );
  createFolderIfNotExist(filePath);
  const template = readFileSync(
    path.resolve("src/templates/MongooseSchemaTemplateForView.txt"),
  ).toString();
  const fileContent = template
    // .replaceAll("{{imports}}", importLines.join("\n"))
    .replaceAll("{{exports}}", exportLines.join("\n"))
    .replaceAll("{{importTypes}}", importTypes.join(","))
    .replaceAll("{{exportModelMapping}}", exportModelMappingLines.join("\n"));
  writeFileSync(filePath, fileContent);
}