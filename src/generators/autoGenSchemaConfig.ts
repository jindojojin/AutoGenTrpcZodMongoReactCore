import {capitalCase} from "change-case";
import {readFileSync, writeFileSync} from "fs";
import _ from "lodash";
import path from "path";
import {DataType,} from "../../share/types/DataTypes";
import {ISchemaDefinition, ISchemaFieldConfig,} from "../../share/types/ISchemaDefinition";
import {createFolderIfNotExist, getRelativePath, getSchemaFolder, getSchemaName, getTypeEnumText,} from "../genUtils";
import {getObjectKeys} from "../../share/CommonFunctions";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {getSpecialKeys} from "../../share/SchemaUtils";
import {GenConfig} from "../../schemas";
import {VIEW_TYPE} from "../../views/ViewTypes";
import {ViewGenConfig} from "../../views";
import {TABLE_API} from "../../custom_apis/TableAPI";
import {TableAPIGenConfig} from "../../custom_apis/index.js";

function getFieldType(type: DataType): string {
    if (Array.isArray(type)) {
        return `[${getFieldType(type[0])}]`;
    } else {
        return getTypeEnumText(type);
    }
}

function toString(key: string, data: any): any {
    if (Array.isArray(data)) {
        return `[${data.map((e) => toString(key, e)).join(",")}]`;
    } else {
        return !["type"].includes(key) && typeof data == "string"
            ? `"${data}"`
            : data;
    }
}

function getKeyConfigs(schema: ISchemaDefinition, schemaName: string) {
    const result: ({
        key: keyof ISchemaFieldConfig;
        type: string;
    } & Omit<ISchemaFieldConfig, "type">)[] = [];
    const keys = getObjectKeys(schema);
    keys.forEach((key) => {
        const propDefinition = schema[key as any];
        if (propDefinition.private) return;
        result.push(
            _.omitBy(
                {
                    ...(_.omit(propDefinition, ["default", "ref"]) as any),
                    key: key as keyof ISchemaFieldConfig,
                    type: getFieldType(schema[key as any].type),
                    label: `${propDefinition.label ?? capitalCase(String(key))}`,
                },
                _.isNil,
            ) as any,
        );
    });
    return result
    .map(
        (config) =>
            `${config.key}:{${getObjectKeys(config)
            .filter((e) => e != "key")
            .map((k) => `${k}:${toString(k, config[k])}`)
            .join(",")}}`,
    )
    .join(",\n\t");
}

function getDynamicConfig(genConfig: GenConfig) {
    if (genConfig.dynamic) {
        return `{
            category: ${getTypeEnumText(genConfig.dynamic.category)},
            property: ${getTypeEnumText(genConfig.dynamic.property)}
        }`
    } else {
        return "undefined"
    }
}

export function genSchemaConfig(outDir: string | string[], name: SCHEMA_TYPE, genConfig: GenConfig) {
    const ModuleName = getSchemaName(name).SchemaName;
    const template = readFileSync(
        path.resolve("src/templates/SchemaConfigTemplate.txt"),
    ).toString();
    if (!Array.isArray(outDir)) outDir = [outDir]
    const filePaths = outDir.map(outDir => path.resolve(
        `${outDir}/schema_configs/${getSchemaFolder(
            genConfig.folder,
        )}${ModuleName}SchemaConfig.ts`,
    ));
    filePaths.forEach(filePath =>
        createFolderIfNotExist(filePath));
    const {
        fileTypeKeys,
        exportKeys,
        searchKeys,
        uniqueKeys,
        relationKeys,
        importKeys
    } = getSpecialKeys(genConfig.schema);
    const keyConfigs = getKeyConfigs(genConfig.schema, name)
    const fileContent = template
    .replaceAll("{{ModuleName}}", ModuleName)
    .replaceAll("{{Module Name}}", name)
    .replaceAll("{{keyConfigs}}", keyConfigs)
    .replaceAll("{{softDelete}}", genConfig.useSoftDelete ? "true" : "false")
    .replaceAll("{{SchemaFolder}}", getSchemaFolder(genConfig.folder))
    .replaceAll("{{RelativePath}}", getRelativePath(genConfig.folder))
    .replaceAll("{{dynamicConfig}}", getDynamicConfig(genConfig))
    .replaceAll("{{fileTypeKeys}}", `[${fileTypeKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{uniqueKeys}}", `[${uniqueKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{exportKeys}}", `[${exportKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{importKeys}}", `[${importKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{relationKeys}}", `[${relationKeys.map((e) => `"${String(e)}"`)}]`)
        .replaceAll("{{searchKeys}}", `[${searchKeys.map((e) => `"${String(e)}"`)}]`);
    filePaths.forEach(filePath =>
        writeFileSync(filePath, fileContent));
}

export function genSchemaConfigForView(outDir: string | string[], name: VIEW_TYPE, genConfig: ViewGenConfig) {
    const ModuleName = getSchemaName(name).SchemaName;
    const template = readFileSync(
        path.resolve("src/templates/SchemaConfigTemplateForView.txt"),
    ).toString();
    if (!Array.isArray(outDir)) outDir = [outDir]
    const filePaths = outDir.map(outDir => path.resolve(
        `${outDir}/schema_configs/${getSchemaFolder(
            genConfig.folder,
        )}${ModuleName}SchemaConfig.ts`,
    ));
    filePaths.forEach(filePath =>
        createFolderIfNotExist(filePath));
    const {
        fileTypeKeys,
        exportKeys,
        searchKeys,
        uniqueKeys,
        relationKeys,
        importKeys
    } = getSpecialKeys(genConfig.view.schema);
    const keyConfigs = getKeyConfigs(genConfig.view.schema, name)
    const fileContent = template
    .replaceAll("{{ModuleName}}", ModuleName)
    .replaceAll("{{Module Name}}", name)
    .replaceAll("{{keyConfigs}}", keyConfigs)
    .replaceAll("{{SchemaFolder}}", getSchemaFolder(genConfig.folder))
    .replaceAll("{{RelativePath}}", getRelativePath(genConfig.folder))
    .replaceAll("{{fileTypeKeys}}", `[${fileTypeKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{uniqueKeys}}", `[${uniqueKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{exportKeys}}", `[${exportKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{importKeys}}", `[${importKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{relationKeys}}", `[${relationKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{searchKeys}}", `[${searchKeys.map((e) => `"${String(e)}"`)}]`);
    filePaths.forEach(filePath =>
        writeFileSync(filePath, fileContent));
}


export function genSchemaConfigForTableAPI(outDir: string | string[], name: TABLE_API, genConfig: TableAPIGenConfig) {
    const ModuleName = getSchemaName(name).SchemaName;
    const template = readFileSync(
        path.resolve("src/templates/SchemaConfigTemplateForView.txt"),
    ).toString();
    if (!Array.isArray(outDir)) outDir = [outDir]
    const filePaths = outDir.map(outDir => path.resolve(
        `${outDir}/schema_configs/${getSchemaFolder(
            genConfig.folder,
        )}${ModuleName}SchemaConfig.ts`,
    ));
    filePaths.forEach(filePath =>
        createFolderIfNotExist(filePath));
    const {
        fileTypeKeys,
        exportKeys,
        searchKeys,
        uniqueKeys,
        relationKeys,
        importKeys
    } = getSpecialKeys(genConfig.config.schema);
    const keyConfigs = getKeyConfigs(genConfig.config.schema, name)
    const fileContent = template
    .replaceAll("{{ModuleName}}", ModuleName)
    .replaceAll("{{Module Name}}", name)
    .replaceAll("{{keyConfigs}}", keyConfigs)
    .replaceAll("{{SchemaFolder}}", getSchemaFolder(genConfig.folder))
    .replaceAll("{{RelativePath}}", getRelativePath(genConfig.folder))
    .replaceAll("{{fileTypeKeys}}", `[${fileTypeKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{uniqueKeys}}", `[${uniqueKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{exportKeys}}", `[${exportKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{importKeys}}", `[${importKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{relationKeys}}", `[${relationKeys.map((e) => `"${String(e)}"`)}]`)
    .replaceAll("{{searchKeys}}", `[${searchKeys.map((e) => `"${String(e)}"`)}]`);
    filePaths.forEach(filePath =>
        writeFileSync(filePath, fileContent));
}
