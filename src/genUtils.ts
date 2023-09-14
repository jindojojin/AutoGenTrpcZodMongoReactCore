import * as fs from "fs";
import {existsSync, mkdirSync} from "fs";
import {BASIC_TYPE, DataType, FILE_TYPE, getBaseType,} from "../share/types/DataTypes";
import {ObjectId} from "mongodb";
import {isPlainObject, mapValues} from "lodash";
import {camelCase, constantCase, pascalCase, snakeCase} from "change-case";
import path from "path";
import {getObjectKeys} from "../share/CommonFunctions";
import {SCHEMA_TYPE} from "../schemas/SchemaTypes";

export function convertObjectIdsToStrings(obj: any): any {
    return mapValues(obj, (value: any) => {
        if (isPlainObject(value)) {
            return convertObjectIdsToStrings(value);
        }
        if (ObjectId.isValid(value)) {
            return value.toString();
        }
        return value;
    });
}

export function getSchemaFolder(schemaFolder?: string) {
    return schemaFolder ? `${schemaFolder}/` : "";
}

export function getRelativePath(schemaFolder?: string) {
    return (
        schemaFolder
            ?.split("/")
            .map((e) => "../")
            .join("") ?? ""
    );
}

export function createFolderIfNotExist(filePath: string) {
    const folderPath = filePath
        .replaceAll("\\", "/")
        .split("/")
        .slice(0, -1)
        .join("/");
    if (!existsSync(folderPath)) mkdirSync(folderPath, {recursive: true});
}

const Text2Enum = {
    SCHEMA_TYPE,
    FILE_TYPE,
    BASIC_TYPE,
};

export function getTypeEnumText(type: DataType) {
    const prefix = getBaseType(type);
    return `${prefix}.${getObjectKeys(Text2Enum[prefix]).find(
        (e) => Text2Enum[prefix][e] === type,
    )}`;
}

export function getSchemaName(schema: string) {
    const original_name =
        getObjectKeys(SCHEMA_TYPE).find((e) => SCHEMA_TYPE[e] === schema) ?? "";
    const SCHEMA_NAME = constantCase(original_name);
    const SchemaName = pascalCase(SCHEMA_NAME);
    const schemaName = camelCase(SCHEMA_NAME);
    const schema_name = snakeCase(SCHEMA_NAME);
    return {SCHEMA_NAME, SchemaName, schema_name, schemaName};
}


export function copyFile(sourceFile: string, targetDirectory: string) {
    try {
        // Đảm bảo thư mục đích tồn tại
        if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory, { recursive: true }); // Tạo thư mục đích và tất cả thư mục con nếu cần
        }

        const sourceFileName = path.basename(sourceFile); // Lấy tên tệp từ đường dẫn nguồn
        const targetFilePath = path.join(targetDirectory, sourceFileName); // Tạo đường dẫn đến tệp đích

        // Sử dụng hàm copyFileSync để copy tệp từ thư mục nguồn đến thư mục đích
        fs.copyFileSync(sourceFile, targetFilePath);
        // console.log(`Đã sao chép ${sourceFile} thành công vào ${targetFilePath}`);
    } catch (error) {
        console.error(`Đã xảy ra lỗi khi sao chép ${sourceFile}:`, error);
    }
}
export function copyFiles(sourceDir: string, targetDir: string) {
    try {
        // Đảm bảo thư mục đích tồn tại
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true }); // Tạo thư mục đích và tất cả thư mục con nếu cần
        }

        // Đọc danh sách tệp và thư mục trong thư mục nguồn
        const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

        // Lặp qua từng tệp và thư mục và thực hiện việc copy
        entries.forEach((entry) => {
            const sourcePath = path.join(sourceDir, entry.name);
            const targetPath = path.join(targetDir, entry.name);

            if (entry.isFile()) {
                // Nếu là tệp, sử dụng hàm copyFileSync để copy
                fs.copyFileSync(sourcePath, targetPath);
                // console.log(`Đã sao chép ${entry.name} thành công`);
            } else if (entry.isDirectory()) {
                // Nếu là thư mục, đệ quy gọi lại hàm copyFiles để sao chép thư mục con
                copyFiles(sourcePath, targetPath);
            }
        });

        // console.log('Hoàn thành việc sao chép các tệp và thư mục.');
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
}