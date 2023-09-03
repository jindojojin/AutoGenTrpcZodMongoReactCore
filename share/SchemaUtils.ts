import {camelCase, capitalCase, constantCase, pascalCase, snakeCase,} from "change-case";
import _ from "lodash";
import {SCHEMAS_CONFIG} from "./schema_configs";
import {isBasicType, isSchemaType, SCHEMA_TYPE} from "./types/DataTypes";
import {ISchemaConfig} from "./types/ISchemaConfig";
import {ISchemaDefinition, ISchemaFieldConfig,} from "./types/ISchemaDefinition";

import {getObjectKeys} from "./CommonFunctions";

export function getSchemaConfigFromFieldConfigs<T>(
    fieldConfigs: ISchemaDefinition<T> | ISchemaFieldConfig[],
    name: string,
    authorize: boolean = false
): ISchemaConfig<T> {
    const SchemaDefinition: ISchemaDefinition<T> = Array.isArray(fieldConfigs)
        ? _.keyBy(fieldConfigs, "_id")
        : (fieldConfigs as any);
    if (Array.isArray(fieldConfigs))
        fieldConfigs = _.keyBy(fieldConfigs, "_id") as ISchemaDefinition<T>;
    const importKeys: (keyof T)[] = [];
    const exportKeys: (keyof T)[] = [];
    const searchKeys: (keyof T)[] = [];
    const uniqueKeys: (keyof T)[] = [];
    const relationKeys: (keyof T)[] = [];
    getObjectKeys(SchemaDefinition).forEach((field) => {
        if (SchemaDefinition[field].importKey) importKeys.push(field);
        if (SchemaDefinition[field].exportKey) exportKeys.push(field);
        if (SchemaDefinition[field].searchKey) searchKeys.push(field);
        if (SchemaDefinition[field].unique) uniqueKeys.push(field);
        if (isSchemaType(SchemaDefinition[field].type)) relationKeys.push(field);
    });
    return {
        exportKeys,
        relationKeys,
        importKeys,
        searchKeys,
        uniqueKeys,
        name,
        fieldConfigs,
    };
}

export function getFieldsMapByTitle<T>(
    schemaConfig?: ISchemaConfig<T>,
    transform?: (t: string) => string
) {
    if (!schemaConfig) return {};
    const result: { [title: string]: keyof T } = {};
    getObjectKeys(schemaConfig.fieldConfigs).forEach((field) => {
        const key =
            schemaConfig.fieldConfigs[field].label ?? capitalCase(String(field));
        result[transform?.(String(key)) ?? key] = field as keyof T;
    });
    return result;
}

export function getLinkedSchemaConfig<T>(fieldConfig: ISchemaFieldConfig) {
    if (isBasicType(fieldConfig.type)) return undefined;
    return SCHEMAS_CONFIG[
        (Array.isArray(fieldConfig.type)
            ? fieldConfig.type[0]
            : fieldConfig.type) as keyof typeof SCHEMAS_CONFIG
        ] as ISchemaConfig<T>;
}

export function mergeSchemaConfig<S, T>(
    source: ISchemaConfig<S>,
    target: ISchemaConfig<T>
): ISchemaConfig<S & T> {
    return {
        fieldConfigs: {
            ...source.fieldConfigs,
            ...target.fieldConfigs,
        },
        exportKeys: [...source.exportKeys, ...target.exportKeys],
        importKeys: [...source.importKeys, ...target.importKeys],
        searchKeys: [...source.searchKeys, ...target.searchKeys],
        uniqueKeys: [...source.uniqueKeys, ...target.uniqueKeys],
        relationKeys: [...source.relationKeys, ...target.relationKeys],
        name: target.name ?? source.name,
    };
}

export function getSchemaName(schema: SCHEMA_TYPE) {
    const original_name =
        getObjectKeys(SCHEMA_TYPE).find((e) => SCHEMA_TYPE[e] === schema) ?? "";
    const SCHEMA_NAME = constantCase(original_name);
    const SchemaName = pascalCase(SCHEMA_NAME);
    const schemaName = camelCase(SCHEMA_NAME);
    const schema_name = snakeCase(SCHEMA_NAME);
    return {SCHEMA_NAME, SchemaName, schema_name, schemaName};
}