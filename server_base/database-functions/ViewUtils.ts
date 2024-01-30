/**
 * Các hàm thông dụng liên quan đến việc tạo view sử dụng SCHEMA_TYPE và VIEW_TYPE
 */
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

import {getMongooseCollectionName} from "../mongoose/Utils";


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

export function $left_join_multi_fields(from: SCHEMA_TYPE, localFields: string[], foreignFields: string[], as: string, fullObject: boolean = false) {
    return [
        {
            $lookup: {
                from: getMongooseCollectionName(from),
                let: localFields.reduce((obj, field, index) => ({...obj, [`v_${index}`]: `$${field}`}), {}),
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: foreignFields.map((ff, i) => ({
                                    $eq: [`$${ff}`, `$$v_${i}`]
                                }))
                            }
                        }
                    }
                ],
                as
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


export function $full_join(from: SCHEMA_TYPE, as: string, fullObject: boolean = false) {
    return [
        {
            $lookup: {
                from: getMongooseCollectionName(from),
                pipeline: [],
                as
            }
        },
        {
            $unwind: {
                path: `$${as}`,
                preserveNullAndEmptyArrays: true
            }
        },
        !fullObject ? {
            $set: {
                [as]: `$${as}._id`
            }
        } : null
    ]
}
