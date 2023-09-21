import _ from "lodash";
import mongoose from "mongoose";
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { getSingleType } from "../../share/types/DataTypes";
import { ISchemaConfig } from "../../share/types/ISchemaConfig";
import { $manyToOneJoin, $objectIdToString, $stringToObjectId } from "./Utils";

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

function stringifyRefKeys(schemaConfig?: ISchemaConfig<any>) {
    return schemaConfig && schemaConfig.relationKeys.length
        ? {
            $set: schemaConfig.relationKeys.reduce(
                (obj, k) => ({
                    ...obj,
                    [k]: { $toString: `$${String(k)}` },
                }),
                {},
            ),
        }
        : null;
}

function parseRefKeys(schemaConfig?: ISchemaConfig<any>) {
    return schemaConfig && schemaConfig.relationKeys.length
        ? {
            $set: schemaConfig.relationKeys.reduce(
                (obj, k) => ({
                    ...obj,
                    [k]: { $toObjectId: `$${String(k)}` },
                }),
                {},
            ),
        }
        : null;
}

export async function findMany(
    input: any,
    Model: mongoose.Model<any>,
    SchemaConfig?: ISchemaConfig<any>,
    advancedQuery?: CustomAggregate,
) {
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