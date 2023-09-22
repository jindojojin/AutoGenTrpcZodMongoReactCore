import {findMany} from "./findMany";
import {TRPCContext} from "../trpc";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";
import {$notAvailable} from "../../share/MongoDBUtils";
import {DELETED_BY} from "../../share/constants/database_fields";
import _ from 'lodash'

export async function textSearch(
    ctx: TRPCContext,
    schema: SCHEMA_TYPE,
    input: any
) {
    const SchemaConfig = ctx.SchemaConfig ?? SCHEMAS_CONFIG[schema]
    return findMany(
        ctx, schema,
        {
            ...input,
            where: {
                $and: _.compact([{},
                    SchemaConfig.searchKeys.length
                        ? {
                            $or: SchemaConfig.searchKeys.map((key) => ({
                                [key]: {$regex: input.text},
                            })),
                        }
                        : null,
                    SchemaConfig.softDelete ? $notAvailable(DELETED_BY) : null
                ])
            }
            ,
        }
    )
        ;
}