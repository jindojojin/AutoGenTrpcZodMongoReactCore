import _ from 'lodash';
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { $notAvailable } from "../../share/MongoDBUtils";
import { DELETED_BY } from "../../share/constants/database_fields";
import { SCHEMAS_CONFIG } from "../../share/schema_configs";
import { isSchemaType } from "../../share/types/DataTypes";
import { VIEWS_CONFIG } from "../../share/view_configs";
import { VIEW_TYPE } from "../../views/ViewTypes";
import { TRPCContext } from "../trpc";
import { findMany } from "./findMany";

export async function textSearch(
    ctx: TRPCContext,
    schema: SCHEMA_TYPE | VIEW_TYPE,
    input: any
) {
    const SchemaConfig = ctx.SchemaConfig ?? (isSchemaType(schema) ? SCHEMAS_CONFIG[schema as SCHEMA_TYPE] : VIEWS_CONFIG[schema as VIEW_TYPE])
    return findMany(
        ctx, schema,
        {
            ...input,
            where: {
                $and: _.compact([{},
                SchemaConfig.searchKeys.length
                    ? {
                        $or: SchemaConfig.searchKeys.map((key) => ({
                            [key]: { $regex: input.text },
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