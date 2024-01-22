/**
 * Các hàm thông dụng liên quan đến việc tạo view sử dụng SCHEMA_TYPE và VIEW_TYPE
 */
import { } from "change-case";
import _ from "lodash";
import mongoose from "mongoose";
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { ViewGenList } from "../../views";
import { VIEW_TYPE } from "../../views/ViewTypes";



const pluralize = mongoose.pluralize() as (str: string) => string

export function $inner_join(from: SCHEMA_TYPE, localField: string, foreignField: string, as: string, fullObject: boolean = false) {
    return [
        {
            $lookup: {
                from: pluralize(from), // Có thể không tồn tại khi gen code --> thêm ?? "" để tránh type check
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
                from: pluralize(from), // Có thể không tồn tại khi gen code --> thêm ?? "" để tránh type check
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
        fullObject ? {
            $set: {
                [as]: `$${as}._id`
            }
        } : null
    ]
}