import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";
import {zTempFileId} from "../zodUtils";
import {getTempFiles} from "../file-storage/FileManager";

export async function createMany(input: any, schema: SCHEMA_TYPE) {
    const Model = DATABASE_MODELS[schema];
    const SchemaConfig = SCHEMAS_CONFIG[schema];
    SchemaConfig.fileTypeKeys.forEach(key => {
        if (input[key] && zTempFileId().parse(input[key])) {
            const file = getTempFiles(input[key])
            //TODO kiểm tra xem đã tự lưu file vào DB hay chưa -> chưa thì lưu vào DB và thay tempID = ID trong DB
            //TODO tạo hàm để gọi lại + nếu tempFile đã bị xoá => Phải huỷ request.
        }
    })
    return Model.insertMany(input) as unknown as string[];
}