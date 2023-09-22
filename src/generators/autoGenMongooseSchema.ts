import {readFileSync, writeFileSync} from "fs";
import {createFolderIfNotExist, getSchemaName, getTypeEnumText} from "../genUtils";
import path from "path";
import {getObjectKeys} from "../../share/CommonFunctions";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

import {GenConfig} from "../../schemas";

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