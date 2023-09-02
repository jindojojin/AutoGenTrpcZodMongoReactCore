import {capitalCase} from "change-case";
import {readFileSync, writeFileSync} from "fs";
import _ from "lodash";
import path from "path";
import {DataType, isSchemaType, SCHEMA_TYPE,} from "../../types/DataTypes";
import {ISchemaDefinition, ISchemaFieldConfig,} from "../../types/ISchemaDefinition";
import {
    createFolderIfNotExist,
    getObjectKeys,
    getRelativePath,
    getSchemaFolder,
    getSchemaName,
    getTypeEnumText,
} from "../../utils/genUtils";
import {GenConfig} from "../../GenList";

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
    let importKeys: any[] = [];
    let exportKeys: any[] = [];
    let searchKeys: any[] = [];
    let uniqueKeys: any[] = [];
    let relationKeys: any[] = [];
    const result: ({
        key: keyof ISchemaFieldConfig;
        type: string;
    } & Omit<ISchemaFieldConfig, "type">)[] = [];
    const keys = getObjectKeys(schema);
    keys.forEach((key) => {
        const propDefinition = schema[key as any];
        if (propDefinition.private) return;
        if (propDefinition.importKey) importKeys.push(key);
        if (propDefinition.exportKey) exportKeys.push(key);
        if (propDefinition.searchKey) searchKeys.push(key);
        if (propDefinition.unique) uniqueKeys.push(key);
        if (isSchemaType(propDefinition.type)) relationKeys.push(key);
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
    return {
        importKeys,
        exportKeys,
        searchKeys,
        uniqueKeys,
        relationKeys,
        keyConfigs: result
            .map(
                (config) =>
                    `${config.key}:{${getObjectKeys(config)
                        .filter((e) => e != "key")
                        .map((k) => `${k}:${toString(k, config[k])}`)
                        .join(",")}}`,
            )
            .join(",\n\t"),
    };
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
        keyConfigs,
        importKeys,
        exportKeys,
        searchKeys,
        uniqueKeys,
        relationKeys,
    } = getKeyConfigs(genConfig.schema, name);
    const fileContent = template
        .replaceAll("{{ModuleName}}", ModuleName)
        .replaceAll("{{Module Name}}", name)
        .replaceAll("{{keyConfigs}}", keyConfigs)
        .replaceAll("{{SchemaFolder}}", getSchemaFolder(genConfig.folder))
        .replaceAll("{{RelativePath}}", getRelativePath(genConfig.folder))
        .replaceAll("{{importKeys}}", `[${importKeys.map((e) => `"${e}"`)}]`)
        .replaceAll("{{uniqueKeys}}", `[${uniqueKeys.map((e) => `"${e}"`)}]`)
        .replaceAll("{{exportKeys}}", `[${exportKeys.map((e) => `"${e}"`)}]`)
        .replaceAll("{{relationKeys}}", `[${relationKeys.map((e) => `"${e}"`)}]`)
        .replaceAll("{{searchKeys}}", `[${searchKeys.map((e) => `"${e}"`)}]`);
    filePaths.forEach(filePath =>
        writeFileSync(filePath, fileContent));
}
