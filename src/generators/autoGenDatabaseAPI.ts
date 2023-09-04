import {createFolderIfNotExist, GenConfig, getSchemaName, getTypeEnumText} from "../../server_base/genUtils";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

export function autoGenDatabaseAPI(outDir:string[],GenList: Record<SCHEMA_TYPE, GenConfig>) {
  const export_routerLines: string[] = [];
  const api_names: string[] = [];
  Object.keys(GenList).forEach((_key) => {
    const key = _key as SCHEMA_TYPE;
    const routeName = getSchemaName(key).schemaName;
    export_routerLines.push(`[${getTypeEnumText(key)}]: "${routeName}"`);
    api_names.push(`"${routeName}"`);
  });

  const filePaths = outDir.map(outDir=> path.resolve(`${outDir}/constants/database_apis.ts`));
  filePaths.forEach(filePath=>createFolderIfNotExist(filePath));

  const template = readFileSync(
    path.resolve("src/templates/DatabaseAPITemplate.txt"),
  ).toString();

  const fileContent = template
    .replaceAll("{{export_apis}}", export_routerLines.join(",\n  "))
    .replaceAll("{{api_names}}", api_names.join("|"));
  filePaths.forEach(filePath=>writeFileSync(filePath, fileContent));
}
