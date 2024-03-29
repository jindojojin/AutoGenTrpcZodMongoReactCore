import {
    camelCase,
    capitalCase,
    constantCase,
    pascalCase,
    snakeCase,
} from "change-case";
import _ from "lodash";
import { SCHEMAS_CONFIG } from "./schema_configs";
import {
    FILE_TYPE,
    getSingleType,
    isBasicType,
    isFileType,
    isSchemaType,
} from "./types/DataTypes";
import { ISchemaConfig } from "./types/ISchemaConfig";
import {
    ISchemaDefinition,
    ISchemaFieldConfig,
} from "./types/ISchemaDefinition";

import { getObjectKeys } from "./CommonFunctions";
import { SCHEMA_TYPE } from "../schemas/SchemaTypes";
import { DYNAMIC_CATEGORY_ID } from "./constants/database_fields";
import { VIEW_TYPE } from "../views/ViewTypes";
import { TABLE_API } from "../custom_apis/TableAPI";

export function getSpecialKeys<T>(SchemaDefinition: ISchemaDefinition<T>) {
    const fileTypeKeys: (keyof T)[] = [];
    const exportKeys: (keyof T)[] = [];
    const importKeys: (keyof T)[] = [];
    const searchKeys: (keyof T)[] = [];
    const uniqueKeys: (keyof T)[] = [];
    const relationKeys: (keyof T)[] = [];
    getObjectKeys(SchemaDefinition).forEach((field) => {
        if (SchemaDefinition[field].exportKey) exportKeys.push(field);
        if (SchemaDefinition[field].importKey) importKeys.push(field);
        if (SchemaDefinition[field].searchKey) searchKeys.push(field);
        if (SchemaDefinition[field].unique) uniqueKeys.push(field);
        if (
            isSchemaType(SchemaDefinition[field].type) ||
            SchemaDefinition[field].type === FILE_TYPE.FILE
        )
            relationKeys.push(field);
        if (isFileType(SchemaDefinition[field].type)) fileTypeKeys.push(field);
    });
    return {
        exportKeys,
        relationKeys,
        fileTypeKeys,
        searchKeys,
        uniqueKeys,
        importKeys,
    };
}

export function getSchemaConfigFromFieldConfigs<T>(
    fieldConfigs: ISchemaDefinition<T> | ISchemaFieldConfig[],
    name: string,
    authorize: boolean = false,
): ISchemaConfig<T> {
    const SchemaDefinition: ISchemaDefinition<T> = Array.isArray(fieldConfigs)
        ? _.keyBy(fieldConfigs, "_id")
        : (fieldConfigs as any);
    return {
        ...getSpecialKeys(SchemaDefinition),
        name,
        fieldConfigs: SchemaDefinition,
    };
}

export function isDynamicSchemaType(type: any) {
    return (
        isSchemaType(type) &&
        SCHEMAS_CONFIG[getSingleType<SCHEMA_TYPE>(type)].dynamic != null
    );
}

export function getFieldsMapByTitle<T>(
    schemaConfig?: ISchemaConfig<T>,
    transform?: (t: string) => string,
) {
    if (!schemaConfig) return {};
    const result: { [title: string]: keyof T } = {};
    getObjectKeys(schemaConfig.fieldConfigs).forEach((field) => {
        const keyLabel =
            schemaConfig.fieldConfigs[field].label ?? capitalCase(String(field));
        const keyType = getSingleType<SCHEMA_TYPE>(
            schemaConfig.fieldConfigs[field].type,
        );
        if (isFileType(keyType)) return; // KHông hỗ trợ import media file
        // nếu đây là kiểu dynamic => add thêm header category
        if (isDynamicSchemaType(keyType)) {
            const DynamicSchemaConfig = SCHEMAS_CONFIG[keyType];
            const categoryLabel =
                DynamicSchemaConfig.fieldConfigs[
                    DYNAMIC_CATEGORY_ID as keyof typeof DynamicSchemaConfig.fieldConfigs
                    ].label;
            const categoryKey = `${String(keyLabel)} (${String(categoryLabel)})`;
            result[transform?.(categoryKey) ?? categoryKey] =
                getCategoryKeyOfDynamicData(field);
        }
        result[transform?.(String(keyLabel)) ?? keyLabel] = field as keyof T;
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

const DB_TYPE = {...SCHEMA_TYPE, ...VIEW_TYPE}

export function getSchemaName(schema: SCHEMA_TYPE | VIEW_TYPE | TABLE_API) {
    const original_name =
        getObjectKeys(DB_TYPE).find((e) => DB_TYPE[e] === schema) ?? "";
    const SCHEMA_NAME = constantCase(original_name);
    const SchemaName = pascalCase(SCHEMA_NAME);
    const schemaName = camelCase(SCHEMA_NAME);
    const schema_name = snakeCase(SCHEMA_NAME);
    return { SCHEMA_NAME, SchemaName, schema_name, schemaName };
}

export function getCategoryKeyOfDynamicData<T>(field: keyof T) {
    return `${String(field)}.${DYNAMIC_CATEGORY_ID}` as keyof T;
}
