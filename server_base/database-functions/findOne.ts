import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { isSchemaType } from "../../share/types/DataTypes";
import { VIEW_TYPE } from "../../views/ViewTypes";
import { DATABASE_MODELS } from "../mongoose/DatabaseModels";
import { DATABASE_VIEWS } from "../mongoose/DatabaseViews";
import { TRPCContext } from "../trpc";

export function findOne(ctx: TRPCContext, schema: SCHEMA_TYPE | VIEW_TYPE, input: any) {
    console.log(`doFindOne with input ${input}`);
    return (isSchemaType(schema) ? DATABASE_MODELS[schema as SCHEMA_TYPE] : DATABASE_VIEWS[schema as VIEW_TYPE]).findOne(
        input.where ?? {},
        input.select,
        input.options,
    ).lean() as any;
}