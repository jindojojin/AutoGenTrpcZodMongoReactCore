import {createFolderIfNotExist, getSchemaName, getTypeEnumText} from "../../utils/genUtils";
import { readFileSync, writeFileSync } from "fs";
import { GenConfig } from "../../GenList";
import { SCHEMA_TYPE } from "../../types/DataTypes";
import path from "path";

export function autoGenDatabaseAPI(outDir:string,GenList: Record<SCHEMA_TYPE, GenConfig>) {
  const export_routerLines: string[] = [];
  const api_names: string[] = [];
  Object.keys(GenList).forEach((_key) => {
    const key = _key as SCHEMA_TYPE;
    const routeName = getSchemaName(key).schemaName;
    export_routerLines.push(`[${getTypeEnumText(key)}]: "${routeName}"`);
    api_names.push(`"${routeName}"`);
  });

  const filePath = path.resolve(`${outDir}/constants/database_apis.ts`);
  createFolderIfNotExist(filePath);

  const template = readFileSync(
    path.resolve("src/templates/DatabaseAPITemplate.txt"),
  ).toString();

  const fileContent = template
    .replaceAll("{{export_apis}}", export_routerLines.join(",\n  "))
    .replaceAll("{{api_names}}", api_names.join("|"));
  writeFileSync(filePath, fileContent);
}
