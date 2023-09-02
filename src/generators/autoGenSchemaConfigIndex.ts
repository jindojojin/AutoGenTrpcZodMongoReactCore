import { readFileSync, writeFileSync } from "fs";
import {
  createFolderIfNotExist,
  getSchemaFolder, getSchemaName,
  getTypeEnumText,
} from "../../utils/genUtils";
import { GenConfig } from "../../GenList";
import path from "path";
import {SCHEMA_TYPE} from "../../types/DataTypes";

export function autoGenSchemaConfigIndex(outDir:string,
  GenList: Record<SCHEMA_TYPE, GenConfig>,
) {
  const importLines: string[] = [];
  const exportLines: string[] = [];
  Object.keys(GenList).forEach((_key) => {
    const key = _key as SCHEMA_TYPE;
    const genConfig = GenList[key];
    const ModuleName = getSchemaName(key).SchemaName;
    importLines.push(
      `import {${ModuleName}SchemaConfig} from "./${getSchemaFolder(
        genConfig.folder,
      )}${ModuleName}SchemaConfig";`,
    );
    exportLines.push(`[${getTypeEnumText(key)}]: ${ModuleName}SchemaConfig`);
  });

  const filePath = path.resolve(`${outDir}/schema_configs/index.ts`);
  createFolderIfNotExist(filePath);
  const template = readFileSync(
    path.resolve("src/templates/SchemaConfigIndexTemplate.txt"),
  ).toString();
  const fileContent = template
    .replaceAll("{{imports}}", importLines.join("\n"))
    .replaceAll("{{exports}}", exportLines.join(",\n  "));
  writeFileSync(filePath, fileContent);
}
