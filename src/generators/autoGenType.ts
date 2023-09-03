import {writeFileSync} from "fs";
import _ from "lodash";
import path from "path";
import {BASIC_TYPE, DataType, isBasicType, isFileType, isSchemaType, } from "../../share/types/DataTypes";
import {createFolderIfNotExist, GenConfig, getSchemaName} from "../../server_base/genUtils";
import {getObjectKeys} from "../../share/CommonFunctions";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

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

function getSchemaTypeStr(schema: SCHEMA_TYPE, genConfig: GenConfig) {
    let fieldTypes: { publicType: undefined | string; privateType: string }[] =
        getObjectKeys(genConfig.schema).map((field) => {
            const {
                private: _private,
                type,
                enum: _enum,
                nullable,
                required,
            } = genConfig.schema[field];
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
        publicType: `export type ${
            getSchemaName(schema).SchemaName
        } = {_id:string,${_.compact(fieldTypes.map((f) => f.publicType)).join(
            ",",
        )}}`,
        privateType: `export type ${
            getSchemaName(schema).SchemaName
        } = {_id:string,${_.compact(fieldTypes.map((f) => f.privateType)).join(
            ",",
        )}}`,
    };
}

export function autoGenSchemaType(publicOutDir: string | string[], privateOutDir: string, genList: Record<SCHEMA_TYPE, GenConfig>) {
    const schemaTypes = getObjectKeys(genList).map((schema) =>
        getSchemaTypeStr(schema, genList[schema]),
    );
    if (!Array.isArray(publicOutDir)) publicOutDir = [publicOutDir]
    const publicFilePaths = publicOutDir.map(publicOutDir => path.resolve(`${publicOutDir}/DatabaseTypes.ts`));
    const privateFilePath = path.resolve(`${privateOutDir}/mongoose/DatabaseTypes.ts`);
    publicFilePaths.forEach(publicFilePath => createFolderIfNotExist(publicFilePath));
    createFolderIfNotExist(privateFilePath);
    publicFilePaths.forEach(publicFilePath => writeFileSync(
        publicFilePath,
        schemaTypes.map((s) => s.publicType).join(";\n")));
    writeFileSync(
        privateFilePath,
        schemaTypes.map((s) => s.privateType).join(";\n"),
    );
}
