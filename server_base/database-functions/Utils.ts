import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";
import {saveTempFiles} from "../file-storage/FileManager";

export async function moveTempFileToDB(input: any | any[], schema: SCHEMA_TYPE) {
    const FileTypeFields = SCHEMAS_CONFIG[schema].fileTypeKeys;
    const Result = Array.isArray(input) ? input : [input]
    for (let i = 0; i < FileTypeFields.length; i++) {
        const key = FileTypeFields[i];
        console.log("Handle ")
        for(let idx=0; idx < Result.length;idx++){
            if(Result[idx][key]) Result[idx][key]  = await saveTempFiles(Result[idx][key])
        }
    }
    console.log("Move file to DB done", Result)
    return Array.isArray(input) ? Result : Result[0]
}