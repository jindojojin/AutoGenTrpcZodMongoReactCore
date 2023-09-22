import _ from "lodash";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {getSingleType} from "../../share/types/DataTypes";
import {ISchemaConfig} from "../../share/types/ISchemaConfig";
import {$manyToOneJoin, $objectIdToString, $stringToObjectId} from "./Utils";
import {TRPCContext} from "../trpc";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";

export type CustomAggregate = (
    stages: [matchStage: any, selectStage: any, optionStage: any],
) => any[];

function getPopulate(config: any, schemaConfig?: ISchemaConfig<any>) {
    if (!Array.isArray(config) || !schemaConfig) return [];
    return config.map((c: { path: string }) => {
        const refType = schemaConfig.fieldConfigs[c.path as keyof any].type;
        if (Array.isArray(refType)) return null; // khong ho tro populate 1 mang objectID
        const relType = getSingleType<SCHEMA_TYPE>(refType);
        return $manyToOneJoin(c.path, relType);
    });
}

export async function findMany(
    ctx:TRPCContext,
    schema: SCHEMA_TYPE,
    input: any,
    advancedQuery?: CustomAggregate,
) {
    const SchemaConfig = ctx.SchemaConfig??SCHEMAS_CONFIG[schema]
    const Model= DATABASE_MODELS[schema]
    let records: any;
    if (advancedQuery) {
        const matchStage = _.compact([
            $objectIdToString(SchemaConfig?.relationKeys),
            input.where ? {
                $match: input.where,
            } : null,
            $stringToObjectId(SchemaConfig?.relationKeys),
        ]);
        const selectStage = input.select
            ? {
                $project: input.select,
            }
            : undefined;
        const optionStage = [
            input.options?.sort && Object.keys(input.options.sort).length
                ? {
                    $sort: input.options.sort,
                }
                : null,
            input.options?.skip
                ? {
                    $skip: input.options.skip,
                }
                : null,
            input.options?.limit
                ? {
                    $limit: input.options.limit,
                }
                : null,
            getPopulate(input.options?.populate, SchemaConfig),
        ];
        const stages = _.compact(_.flattenDeep(
                advancedQuery(
                    [
                        matchStage
                        ,
                        selectStage
                        ,
                        optionStage

                    ]),
            ))
        ;
        records = await Model.aggregate(stages);
    } else {
        records = await Model.find(
            input.where ?? {},
            input.select,
            input.options as any,
        ).lean();
    }

    const total = await Model.countDocuments(input.where ?? {});
    return {
        total,
        limit: input.options?.limit,
        skip: input.options?.skip,
        records,
    };
}