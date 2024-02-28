import {writeFileSync} from "fs";
import _ from "lodash";
import path from "path";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {getObjectKeys} from "../../share/CommonFunctions";
import {BASIC_TYPE, DataType, isBasicType, isFileType, isSchemaType,} from "../../share/types/DataTypes";
import {createFolderIfNotExist, getSchemaName} from "../genUtils";

import {GenConfig} from "../../schemas";
import {ISchemaDefinition} from "../../share/types/ISchemaDefinition";
import {ViewGenConfig} from "../../views";
import {VIEW_TYPE} from "../../views/ViewTypes";
import {TABLE_API} from "../../custom_apis/TableAPI";
import {TableAPIGenConfig} from "../../custom_apis/index.js";

const BasicTypeStr: Record<BASIC_TYPE, string> = {
    [BASIC_TYPE.BOOLEAN]: "boolean",
    [BASIC_TYPE.DATE]: "Date",
    [BASIC_TYPE.DATE_RANGE]: "{start:Date,end:Date}",
    [BASIC_TYPE.TEXT]: "string",
    [BASIC_TYPE.NUMBER]: "number",
    [BASIC_TYPE.ENUM]: "string",
    [BASIC_TYPE.TIME]: "Date",
    [BASIC_TYPE.UNKNOWN]: "any",
    [BASIC_TYPE.DATE_TIME]: "Date",
    [BASIC_TYPE.DATE_TIME_RANGE]: "{start:Date,end:Date}",
};

function getTypeStr(type: DataType, enums?: string[]): string {
    if (Array.isArray(type)) return `(${getTypeStr(type[0], enums)})[]`;
    let typeStr = "any";
    if (isBasicType(type)) {
        typeStr =
            type == BASIC_TYPE.ENUM && enums
                ? enums.map((e) => `"${e}"`).join("|")
                : BasicTypeStr[type as BASIC_TYPE];
    } else if (isFileType(type)) {
        typeStr = "string";
    } else if (isSchemaType(type)) {
        typeStr = `(string|${getSchemaName(type as SCHEMA_TYPE).SchemaName})`;
    }
    return typeStr;
}

function getTypeObjectStr(schema: ISchemaDefinition, name: string) {
    let fieldTypes: { publicType: undefined | string; privateType: string }[] =
        getObjectKeys(schema).map((field) => {
            const {
                private: _private,
                type,
                enum: _enum,
                nullable,
                required,
            } = schema[field];
            const typeStr = `${String(field)}${required ? "" : "?"}:${getTypeStr(
                type,
                _enum,
            )}${nullable ? "|null" : ""}`;
            return {
                publicType: _private ? undefined : typeStr,
                privateType: typeStr,
            };
        });
    return {
        publicType: `export type ${getSchemaName(name).SchemaName
            } = {_id:string,${_.compact(fieldTypes.map((f) => f.publicType)).join(
                ",",
            )}}`,
        privateType: `export type ${getSchemaName(name).SchemaName
            } = {_id:string,${_.compact(fieldTypes.map((f) => f.privateType)).join(
                ",",
            )}}`,
    };
}

function getSchemaTypeStr(schema: SCHEMA_TYPE, genConfig: GenConfig) {
    return getTypeObjectStr(genConfig.schema, schema);
}

function getViewTypeStr(view: VIEW_TYPE, ViewDefinition: ViewGenConfig) {
    return getTypeObjectStr(ViewDefinition.view.schema, view)
}


export function autoGenSchemaType(publicOutDir: string | string[], privateOutDir: string, SchemaGenList: Record<SCHEMA_TYPE, GenConfig>, ViewGenList: Record<VIEW_TYPE, ViewGenConfig>, TableAPIGen: Record<TABLE_API, TableAPIGenConfig>) {
    const schemaTypes = getObjectKeys(SchemaGenList).map((schema) =>
        getSchemaTypeStr(schema, SchemaGenList[schema]),
    );

    const viewTypes = getObjectKeys(ViewGenList).map((view) => getViewTypeStr(view, ViewGenList[view]))
    const tableApiTypes = getObjectKeys(TableAPIGen).map(table => getTypeObjectStr(TableAPIGen[table].config.schema, table))
    if (!Array.isArray(publicOutDir)) publicOutDir = [publicOutDir]
    const publicFilePaths = publicOutDir.map(publicOutDir => path.resolve(`${publicOutDir}/DatabaseTypes.ts`));
    const privateFilePath = path.resolve(`${privateOutDir}/mongoose/DatabaseTypes.ts`);
    publicFilePaths.forEach(publicFilePath => createFolderIfNotExist(publicFilePath));
    createFolderIfNotExist(privateFilePath);
    publicFilePaths.forEach(publicFilePath => writeFileSync(
        publicFilePath,
        [...schemaTypes, ...viewTypes, ...tableApiTypes].map((s) => s.publicType).join(";\n")));
    writeFileSync(
        privateFilePath,
        [...schemaTypes, ...viewTypes, ...tableApiTypes].map((s) => s.privateType).join(";\n"),
    );
}
