import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { getObjectKeys } from "../../share/CommonFunctions";
import { createFolderIfNotExist, getSchemaName, getTypeEnumText } from "../genUtils";

import { GenConfig } from "../../schemas";
import { ViewGenConfig } from "../../views";
import { VIEW_TYPE } from "../../views/ViewTypes";

export function autoGenDatabaseModel(outDir: string, GenList: Record<SCHEMA_TYPE, GenConfig>) {
    const importLines: string[] = [];
    const exportLines: string[] = [];
    const initModelLines: string[] = [];
    const exportModelMapingLines: string[] = [];
    getObjectKeys(GenList).map((_key) => {
        const key = _key as SCHEMA_TYPE;
        const ModuleName = getSchemaName(key).SchemaName;

        importLines.push(`${ModuleName}MongooseSchema`);
        exportLines.push(
            `export const ${ModuleName}Model = mongoose.model(${getTypeEnumText(key)},  ${ModuleName}MongooseSchema);`,
        );
        initModelLines.push(`await ${ModuleName}Model.syncIndexes();`)
        exportModelMapingLines.push(
            `[${getTypeEnumText(key)}] : ${ModuleName}Model,`,
        );
    });

    const filePath = path.resolve(`${outDir}/mongoose/DatabaseModels.ts`);
    createFolderIfNotExist(filePath);
    const template = readFileSync(
        path.resolve("src/templates/DatabaseModelsTemplate.txt"),
    ).toString();
    const fileContent = template
        .replaceAll(
            "{{imports}}",
            `import {${importLines.join(",")}} from "./MongooseSchemas"`,
        )
        .replaceAll("{{exports}}", exportLines.join("\n"))
        .replaceAll("{{initModels}}", initModelLines.join("\n"))
        .replaceAll("{{exportModelMapping}}", exportModelMapingLines.join("\n"));
    writeFileSync(filePath, fileContent);
}

export function autoGenDatabaseModelForView(outDir: string, GenList: Record<VIEW_TYPE, ViewGenConfig>) {
    const importLines: string[] = [];
    const exportLines: string[] = [];
    const initViewLines: string[] = [];
    const exportModelMapingLines: string[] = [];
    getObjectKeys(GenList).map((key) => {
        const ModuleName = getSchemaName(key).SchemaName;

        importLines.push(`${ModuleName}MongooseSchema`);
        exportLines.push(
            `export const ${ModuleName}Model = mongoose.model(${getTypeEnumText(key)},  ${ModuleName}MongooseSchema);\n`,
        );
        initViewLines.push(`await ${ModuleName}Model.collection.drop();
        await ${ModuleName}Model.createCollection(getViewConfig(${getTypeEnumText(key)}))
      `)
        exportModelMapingLines.push(
            `[${getTypeEnumText(key)}] : ${ModuleName}Model,`,
        );
    });

    const filePath = path.resolve(`${outDir}/mongoose/DatabaseViews.ts`);
    createFolderIfNotExist(filePath);
    const template = readFileSync(
        path.resolve("src/templates/DatabaseModelsTemplateForView.txt"),
    ).toString();
    const fileContent = template
        .replaceAll(
            "{{imports}}",
            `import {${importLines.join(",")}} from "./MongooseViews"`,
        )
        .replaceAll("{{exports}}", exportLines.join("\n"))
        .replaceAll("{{initViews}}", initViewLines.join("\n"))
        .replaceAll("{{exportModelMapping}}", exportModelMapingLines.join("\n"));
    writeFileSync(filePath, fileContent);
}