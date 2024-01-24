/**
 * Các hàm thông dụng liên quan đến việc tạo view sử dụng SCHEMA_TYPE và VIEW_TYPE
 */
import { } from "change-case";
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { getMongooseCollectionName } from "../../share/CommonFunctions";



export function $inner_join(from: SCHEMA_TYPE, localField: string, foreignField: string, as: string, fullObject: boolean = false) {
    return [
        {
            $lookup: {
                from: getMongooseCollectionName(from),
                localField,
                foreignField,
                as,
            }
        },
        {
            $unwind: {
                path: `$${as}`,
                preserveNullAndEmptyArrays: false,
            },
        },
        fullObject ? {
            $set: {
                [as]: `$${as}._id`
            }
        } : null
    ]
}

export function $left_join(from: SCHEMA_TYPE, localField: string, foreignField: string, as: string, fullObject: boolean = false) {
    return [
        {
            $lookup: {
                from: getMongooseCollectionName(from),
                localField,
                foreignField,
                as,
            }
        },
        {
            $unwind: {
                path: `$${as}`,
                preserveNullAndEmptyArrays: true,
            },
        },
        !fullObject ? {
            $set: {
                [as]: `$${as}._id`
            }
        } : null
    ]
}