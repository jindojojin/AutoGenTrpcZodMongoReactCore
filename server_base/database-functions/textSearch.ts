import _ from 'lodash';
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {$notAvailable} from "../../share/MongoDBUtils";
import {DELETED_BY} from "../../share/constants/database_fields";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";
import {VIEW_TYPE} from "../../views/ViewTypes";
import {TRPCContext} from "../trpc";
import {CustomAggregate, findMany} from "./findMany";
import {TABLE_API} from "../../custom_apis/TableAPI";

export async function textSearch(
    ctx: TRPCContext,
    schema: SCHEMA_TYPE | VIEW_TYPE | TABLE_API,
    input: any,
    advancedQuery?: CustomAggregate
) {
    const SchemaConfig = ctx.SchemaConfig ?? SCHEMAS_CONFIG[schema as SCHEMA_TYPE]
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
        }, advancedQuery
    )
        ;
}
