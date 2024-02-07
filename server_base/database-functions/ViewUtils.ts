/**
 * Các hàm thông dụng liên quan đến việc tạo view sử dụng SCHEMA_TYPE và VIEW_TYPE
 */
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

import {getMongooseCollectionName} from "../mongoose/Utils";
import {VIEW_TYPE} from "../../views/ViewTypes";


export function $inner_join(from: SCHEMA_TYPE | VIEW_TYPE, localField: string, foreignField: string,
                            as: string, fullObject: boolean = false) {
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
        !fullObject ? {
            $set: {
                [as]: `$${as}._id`
            }
        } : null
    ]
}

export function $left_join(from: SCHEMA_TYPE | VIEW_TYPE, localField: string, foreignField: string, as: string, fullObject: boolean = false) {
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

export function $left_join_multi_fields(from: SCHEMA_TYPE | VIEW_TYPE, localFields: string[], foreignFields: string[], as: string, fullObject: boolean = false) {
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


export function $full_join(from: SCHEMA_TYPE | VIEW_TYPE, as: string, fullObject: boolean = false) {
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

export function $add_percent_value(count: string | string[], total: string | string[], result_field: string | string[]) {
    count = Array.isArray(count) ? count : [count];
    total = Array.isArray(total) ? total : [total];
    result_field = Array.isArray(result_field) ? result_field : [result_field];
    return [
        {
            $addFields: result_field.reduce((prev, field_name, idx) => ({
                ...prev,
                [field_name]: {
                    $concat: [
                        {
                            $toString: {
                                $round: [{
                                    $multiply: [{
                                        $divide: [`$${count[idx]}`, {
                                            $cond: {
                                                if: {$eq: [0, `$${total[idx]}`]}, then: 1, else: `$${total[idx]}`
                                            }
                                        }]
                                    }, 100]
                                }, 2]
                            }
                        },
                        "%"
                    ]
                }
            }), {})
        }
    ]
}
