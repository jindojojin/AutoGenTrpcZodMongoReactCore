import {createFolderIfNotExist, getSchemaFolder, getSchemaName, getTypeEnumText,} from "../genUtils";
import {readFileSync, writeFileSync} from "fs";
import path from "path";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

import {GenConfig} from "../../schemas";
import {VIEW_TYPE} from "../../views/ViewTypes";
import {ViewGenConfig} from "../../views";
import {getObjectKeys} from "../../client_base/Common/Utils";
import {TABLE_API} from "../../custom_apis/TableAPI";
import {TableAPIGenConfig} from "../../custom_apis/index.js";

export function autoGenZodIndex(outDir: string, GenList: Record<SCHEMA_TYPE, GenConfig>) {
  const importLines: string[] = [];
  const export_importLines: string[] = [];
  const export_ApiLines: string[] = [];
  const export_outputLines: string[] = [];
  Object.keys(GenList).forEach((_key) => {
    const key = _key as SCHEMA_TYPE;
    const genConfig = GenList[key];
    const ModuleName = getSchemaName(key).SchemaName;
    importLines.push(
        `import {z${ModuleName}Input, z${ModuleName}Output, Zod${ModuleName}APIs} from "./${getSchemaFolder(
        genConfig.folder,
      )}z${ModuleName}";`,
    );
    export_importLines.push(`[${getTypeEnumText(key)}]: z${ModuleName}Input`);
    export_ApiLines.push(`[${getTypeEnumText(key)}]: Zod${ModuleName}APIs`);
    export_outputLines.push(`[${getTypeEnumText(key)}]: z${ModuleName}Output`);
  });

  const filePath = path.resolve(`${outDir}/zods/index.ts`);
  createFolderIfNotExist(filePath);
  const template = readFileSync(
    path.resolve("src/templates/ZodIndexTemplate.txt"),
  ).toString();
  const fileContent = template
    .replaceAll("{{imports}}", importLines.join("\n"))
    .replaceAll("{{exports}}", export_importLines.join(",\n"))
    .replaceAll("{{export_apis}}", export_ApiLines.join(",\n"))
    .replaceAll("{{export_outputs}}", export_outputLines.join(",\n"));
  writeFileSync(filePath, fileContent);
}

export function autoGenZodIndexForView(outDir: string, GenList: Record<VIEW_TYPE, ViewGenConfig>, TableList: Record<TABLE_API, TableAPIGenConfig>) {
  const importLines: string[] = [];
  const export_importLines: string[] = [];
  const export_ApiLines: string[] = [];
  const export_outputLines: string[] = [];
  getObjectKeys({...GenList, ...TableList}).forEach((key) => {
    const genConfig = ({...GenList, ...TableList})[key];
    const ModuleName = getSchemaName(key).SchemaName;
    importLines.push(
        `import {z${ModuleName}Input, z${ModuleName}Output, Zod${ModuleName}APIs} from "./${getSchemaFolder(
            genConfig.folder,
        )}z${ModuleName}";`,
    );
    export_importLines.push(`[${getTypeEnumText(key)}]: z${ModuleName}Input`);
    export_ApiLines.push(`[${getTypeEnumText(key)}]: Zod${ModuleName}APIs`);
    export_outputLines.push(`[${getTypeEnumText(key)}]: z${ModuleName}Output`);
  });

  const filePath = path.resolve(`${outDir}/view_zods/index.ts`);
  createFolderIfNotExist(filePath);
  const template = readFileSync(
    path.resolve("src/templates/ZodIndexTemplateForView.txt"),
  ).toString();
  const fileContent = template
    .replaceAll("{{imports}}", importLines.join("\n"))
    .replaceAll("{{exports}}", export_importLines.join(",\n"))
    .replaceAll("{{export_apis}}", export_ApiLines.join(",\n"))
    .replaceAll("{{export_outputs}}", export_outputLines.join(",\n"));
  writeFileSync(filePath, fileContent);
}
