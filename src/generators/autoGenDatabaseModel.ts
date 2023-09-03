import {readFileSync, writeFileSync} from "fs";
import {SCHEMA_TYPE} from "../../share/types/DataTypes";
import {createFolderIfNotExist, GenConfig, getSchemaName, getTypeEnumText} from "../../server_base/genUtils";
import path from "path";
import {getObjectKeys} from "../../share/CommonFunctions";

export function autoGenDatabaseModel(outDir: string, GenList: Record<SCHEMA_TYPE, GenConfig>) {
    const importLines: string[] = [];
    const exportLines: string[] = [];
    const exportModelMapingLines: string[] = [];
    getObjectKeys(GenList).map((_key) => {
        const key = _key as SCHEMA_TYPE;
        const ModuleName = getSchemaName(key).SchemaName;

        importLines.push(`${ModuleName}MongooseSchema`);
        exportLines.push(
            `export const ${ModuleName}Model = mongoose.model("${ModuleName}",  ${ModuleName}MongooseSchema);\n ${ModuleName}Model.syncIndexes()`,
        );
        exportModelMapingLines.push(
            `[${getTypeEnumText(key)}] : ${ModuleName}Model,`,
        );
    });

    const filePath = path.resolve(`${outDir}/mongoose/DatabaseModels.ts`);
    console.log("File path:", filePath);
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
        .replaceAll("{{exportModelMapping}}", exportModelMapingLines.join("\n"));
    writeFileSync(filePath, fileContent);
}
