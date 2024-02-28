import {z} from "zod";
import _ from "lodash";
import {BulkWriteResult} from "mongodb";
import {zObjectId} from "../zodUtils";
import {TRPCContext} from "../trpc";

import {LAST_MODIFIED_BY} from "../../share/constants/database_fields";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";

export const zUpsertOutput = z.object({
    insertedIds: zObjectId().array(),
    insertedCount: z.number(),
    updatedCount: z.number(),
    errors: z
    .object({
        idx: z.number(),
        message: z.string(),
    })
    .array()
    .optional(),
});

/**
 *
 * @param ctx
 * @param input
 * @param schema
 * @param strictFilter nếu key là 1 mảng, sử dụng and thay vì or (default)
 */
export async function upsertMany(
    ctx: TRPCContext,
    schema: SCHEMA_TYPE,
    input: {
        key: any;
        data: any[];
    },
    strictFilter: boolean = false,
): Promise<z.infer<typeof zUpsertOutput>> {
    try {
        const keys = Array.isArray(input.key) ? input.key : _.compact([input.key]);
        console.log("Upsert by keys", keys);
        const bulkWriteResult = await DATABASE_MODELS[schema].bulkWrite(
            input.data
            .map((v) => ({
                ..._.omitBy(v, _.isUndefined),
                [LAST_MODIFIED_BY]: ctx.auth?.userProfile._id
            }))
            .map((value: any) =>
                keys.length
                    ? {
                        updateOne: {
                            filter: strictFilter
                                ? keys.reduce(
                                    (obj, key) =>
                                        value[key]
                                            ? {
                                                ...obj,
                                                [key]: (value as any)[key],
                                            }
                                            : obj,
                                    {},
                                )
                                : {
                                    $or: keys.map((key: any) => ({
                                        [key]: (value as any)[key],
                                    })),
                                },
                            update: value,
                            upsert: true,
                        },
                    }
                    : {
                        insertOne: { document: value },
                    },
            ),
            {
                ordered: false,
            },
        );
        return convertMongoResult(bulkWriteResult as any);
    } catch (e: any) {
        try {
            return convertMongoResult(e.rawResult, e.validationErrors);
        } catch (e2) {
            console.log("Error", e2);
            throw e;
        }
    }
}

function convertMongoResult(
    result: BulkWriteResult,
    errors?: any[],
): z.infer<typeof zUpsertOutput> {
    return {
        insertedIds: [
            ...Object.values(result.upsertedIds),
            ...Object.values(result.insertedIds),
        ],
        insertedCount: result.upsertedCount + result.insertedCount,
        updatedCount: result.modifiedCount,
        errors: errors?.map((e) => ({ idx: e.index, message: e.error.toString() })),
    };
}