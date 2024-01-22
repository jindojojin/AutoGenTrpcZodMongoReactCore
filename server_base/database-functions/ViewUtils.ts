/**
 * Các hàm thông dụng liên quan đến việc tạo view sử dụng SCHEMA_TYPE và VIEW_TYPE
 */
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { ViewGenList } from "../../views";
import { VIEW_TYPE } from "../../views/ViewTypes";
import { DATABASE_MODELS } from "../mongoose/DatabaseModels";

export function getViewConfig(view: VIEW_TYPE){
    return {
        viewOn: DATABASE_MODELS[ViewGenList[view].view.viewOn].collection.name,
        pipeline: ViewGenList[view].view.pineline
    }
}

export const $inner_join = (from: SCHEMA_TYPE, localField: string, foreignField: string, as: string, fullObject: boolean = false) => [
    {
        $lookup: {
            from: DATABASE_MODELS[from]?.collection?.name ?? "", // Có thể không tồn tại khi gen code --> thêm ?? "" để tránh type check
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

export const $left_join = (from: SCHEMA_TYPE, localField: string, foreignField: string, as: string, fullObject: boolean = false) => [
    {
        $lookup: {
            from: DATABASE_MODELS[from]?.collection?.name ?? "", // Có thể không tồn tại khi gen code --> thêm ?? "" để tránh type check
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