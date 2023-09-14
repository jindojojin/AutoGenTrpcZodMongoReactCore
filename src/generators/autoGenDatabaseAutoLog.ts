import {readFileSync, writeFileSync} from "fs";
import {createFolderIfNotExist, getSchemaName} from "../genUtils";
import path from "path";
import {getObjectKeys} from "../../share/CommonFunctions";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

import {GenConfig} from "../../schemas";

export function autoGenDatabaseAutoLog(
    outDir:string,
  GenList: Record<SCHEMA_TYPE, GenConfig>,
) {
  const importLines: string[] = [];
  const exportLines: string[] = [];
  getObjectKeys(GenList)
    .filter((k) => GenList[k].logSchema)
    .map((_key) => {
      const key = _key as SCHEMA_TYPE;
      const logKey = GenList[key].logSchema as SCHEMA_TYPE;
      const ModuleName = getSchemaName(key).SchemaName;
      const LogModuleName = getSchemaName(logKey).SchemaName;
      importLines.push(`${ModuleName}Model`);
      importLines.push(`${LogModuleName}Model`);
      exportLines.push(
        `watchChangeThenUpdateToLog(${ModuleName}Model, ${LogModuleName}Model);`,
      );
    });

  const filePath = path.resolve(
    `${outDir}/mongoose/DatabaseAutoLog.ts`,
  );
  console.log("File path:", filePath);
  createFolderIfNotExist(filePath);
  const template = readFileSync(
    path.resolve("src/templates/DatabaseAutoLogTemplate.txt"),
  ).toString();
  const fileContent = template
    .replaceAll(
      "{{imports}}",
      `import {${importLines.join(",")}} from "./DatabaseModels"`,
    )
    .replaceAll("{{exports}}", exportLines.join("\n"));
  writeFileSync(filePath, fileContent);
}