import mongoose, {Model, Schema} from "mongoose";
import _ from "lodash";
import {getBaseZodFromFieldConfigs, getBasicRouteZodIO} from "./ZodBuilders";
import {getSchemaFromFieldConfigs} from "./SchemaBuilder";
import {ProcedureBuilder} from "@trpc/server";
import {z} from "zod";
import {zObjectId} from "../../zodUtils";
import {ISchemaConfig} from "../../../share/types/ISchemaConfig";
import {getSchemaConfigFromFieldConfigs} from "../../../share/SchemaUtils";
import {ISchemaDefinition} from "../../../share/types/ISchemaDefinition";

import {DYNAMIC_CATEGORY_ID} from "../../../share/constants/database_fields";

export type DynamicTableCtx = {
  ZodBase: ReturnType<typeof getBaseZodFromFieldConfigs>;
  ZodAPI: ReturnType<typeof getBasicRouteZodIO>;
  MongoSchema: ReturnType<typeof getSchemaFromFieldConfigs>;
  SchemaConfig: ISchemaConfig<any>;
};

export const DynamicTableConfigs: Map<string, DynamicTableCtx> = new Map();

export async function getZodAndSchemaByCategory(
  categoryId: string | undefined | null,
  PropertyModel: Model<any>,
  CategoryModel: Model<any>,
  fixedFields: ISchemaDefinition,
  defaultCategoryName?: string,
) {
  // if (DynamicTableConfigs.has(String(categoryId))) {
  //   return DynamicTableConfigs.get(String(categoryId)) as DynamicTableCtx;
  // } else
  {
    let category: any = { name: defaultCategoryName };
    if (categoryId) {
      category = await CategoryModel.findById(categoryId).lean();
    }
    const listFields = await PropertyModel.find(
      categoryId
        ? {
            [DYNAMIC_CATEGORY_ID]: { $in: [categoryId] },
          }
        : {},
    ).lean();
    const fieldConfigs = {
      ...fixedFields,
      ...(_.keyBy(listFields, "_id") as any),
    };
    console.log("FieldConfigs", fieldConfigs);
    const ZodBase = getBaseZodFromFieldConfigs(fieldConfigs);
    const result = {
      ZodBase,
      ZodAPI: getBasicRouteZodIO(ZodBase),
      MongoSchema: getSchemaFromFieldConfigs(fieldConfigs),
      SchemaConfig: getSchemaConfigFromFieldConfigs(
        fieldConfigs,
        (category as any)?.name,
      ),
    };
    DynamicTableConfigs.set(String(categoryId), result);
    return result;
  }
}

/**
 *
 * @param procedure
 * @param DataModel Model lưu data dynamic
 * @param PropertyModel Model lưu thông tin các trường theo từng category
 * @param MongoDataSchema Schema dynamic định nghĩa dữ liệu cho DataModel
 * @param categoryField Tên trường chỉ định _id của category, yêu cầu giống nhau ở DataModel và PropertyModel
 */
export interface DynamicTableProcedureParams {
  procedure: ProcedureBuilder<any>;
  MongoDataSchema: Schema;
  PropertyModel: Model<any>;
  CategoryModel: Model<any>;
  DataModel: mongoose.Model<any>;
  fixedFields: ISchemaDefinition;
}

export const dynamicTableProcedure = (
  params: DynamicTableProcedureParams,
  inputZod: keyof ReturnType<typeof getBasicRouteZodIO>,
  outputZod: keyof ReturnType<typeof getBasicRouteZodIO>,
) => {
  return params.procedure
    .input(
      z.object({
        categoryId: zObjectId().optional().nullable(),
        input: z.any(),
      }),
    )
    .output(z.any())
    .use(async ({ ctx, input, next }) => {
      const dynamicTableCtx = await getZodAndSchemaByCategory(
        input.categoryId,
        params.PropertyModel,
        params.CategoryModel,
        params.fixedFields,
      );
      params.MongoDataSchema.add(dynamicTableCtx.MongoSchema);
      await params.DataModel.syncIndexes();
      await dynamicTableCtx.ZodAPI[
        inputZod as keyof typeof dynamicTableCtx.ZodAPI
      ].parseAsync(input.input);
      return next({
        ctx: {
          ...ctx,
          ZodBase: dynamicTableCtx.ZodBase,
          ZodInput:
            dynamicTableCtx.ZodAPI[
              inputZod as keyof typeof dynamicTableCtx.ZodAPI
            ],
          ZodOutput:
            dynamicTableCtx.ZodAPI[
              outputZod as keyof typeof dynamicTableCtx.ZodAPI
            ],
          SchemaConfig: dynamicTableCtx.SchemaConfig,
        },
      });
    });
};