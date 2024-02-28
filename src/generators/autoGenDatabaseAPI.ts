import {createFolderIfNotExist, getSchemaName, getTypeEnumText} from "../genUtils";
import {readFileSync, writeFileSync} from "fs";
import path from "path";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

import {GenConfig} from "../../schemas";
import {VIEW_TYPE} from "../../views/ViewTypes";
import {ViewGenConfig} from "../../views";
import {getObjectKeys} from "../../share/CommonFunctions";
import {TABLE_API} from "../../custom_apis/TableAPI";
import {TableAPIGenConfig} from "../../custom_apis/index.js";

export function autoGenDatabaseAPI(outDir: string[], GenList: Record<SCHEMA_TYPE, GenConfig>, ViewGenList: Record<VIEW_TYPE, ViewGenConfig>, TableGenList: Record<TABLE_API, TableAPIGenConfig>) {
  const export_routerLines: string[] = [];
  const api_names: string[] = [];
  getObjectKeys({...GenList, ...ViewGenList, ...TableGenList}).forEach((key) => {
    const routeName = getSchemaName(key).schemaName;
    export_routerLines.push(`[${getTypeEnumText(key)}]: "${routeName}"`);
    api_names.push(`"${routeName}"`);
  });

  const filePaths = outDir.map(outDir => path.resolve(`${outDir}/constants/database_apis.ts`));
  filePaths.forEach(filePath => createFolderIfNotExist(filePath));

  const template = readFileSync(
    path.resolve("src/templates/DatabaseAPITemplate.txt"),
  ).toString();

  const fileContent = template
    .replaceAll("{{export_apis}}", export_routerLines.join(",\n  "))
    .replaceAll("{{api_names}}", api_names.join("|"));
  filePaths.forEach(filePath=>writeFileSync(filePath, fileContent));
}
