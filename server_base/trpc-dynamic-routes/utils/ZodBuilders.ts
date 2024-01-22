import { AnyZodObject, z, ZodType, ZodTypeAny } from "zod";
import { BASIC_TYPE, DataType, isBasicType, isSchemaType, } from "../../../share/types/DataTypes";
import { ISchemaFieldConfig } from "../../../share/types/ISchemaDefinition";
import { zImportOutput } from "../../database-functions/importMany";
import { ZOD_OUTPUTS } from "../../zods";
import { zObjectId, ZodMongoQuery } from "../../zodUtils";

function getIOQueryZod(zodType: ZodTypeAny) {
    return {
        input: zodType,
        output: zodType,
        query: ZodMongoQuery.z$query(zodType),
    };
}

function getZodOptions(zod: ZodTypeAny, fieldConfig: ISchemaFieldConfig) {
    if (!fieldConfig.required) zod = zod.optional();
    if (fieldConfig.nullable) zod = zod.nullable();
    return zod;
}

export function getZodFromFieldConfig(
    type: DataType,
    fieldConfig: ISchemaFieldConfig,
    inArray: boolean = false,
): { input: ZodTypeAny; output: ZodTypeAny; query: ZodTypeAny } {
    if (Array.isArray(type)) {
        const zods = getZodFromFieldConfig(type[0], fieldConfig, true);
        return {
            input: z.array(zods.input),
            output: z.array(zods.output),
            query: ZodMongoQuery.z$arrayQuery(zods.query),
        };
    } else {
        if (isBasicType(type)) {
            switch (type as BASIC_TYPE) {
                case BASIC_TYPE.DATE:
                case BASIC_TYPE.TIME:
                    return getIOQueryZod(z.date());
                case BASIC_TYPE.TEXT:
                    return getIOQueryZod(z.string());
                case BASIC_TYPE.NUMBER:
                    return getIOQueryZod(z.number());
                case BASIC_TYPE.ENUM:
                    return getIOQueryZod(z.enum(fieldConfig.enum as any));
                case BASIC_TYPE.BOOLEAN:
                    return getIOQueryZod(z.boolean());
                case BASIC_TYPE.DATE_RANGE:
                    return getIOQueryZod(
                        z.object({
                            start: z.date(),
                            end: z.date(),
                        }),
                    );
                default:
                    return getIOQueryZod(z.any());
            }
        } else {
            return {
                input: zObjectId(),
                output: isSchemaType(type)
                    ? z.union([zObjectId(), ZOD_OUTPUTS[type as keyof typeof ZOD_OUTPUTS]])
                    : zObjectId(), // FILE TYPE -> chỉ trả về objectID TODO cho phép populate để lấy về toàn bộ thông tin file.
                query: ZodMongoQuery.z$query(zObjectId()),
            };
        }
    }
}

export function getBaseZodFromFieldConfigs<T>(fieldConfigs: {
    [p: string]: ISchemaFieldConfig;
}) {
    const result = Object.keys(fieldConfigs).reduce(
        (result, field) => {
            if (field == "_id") return result;
            const zodConfig = getZodFromFieldConfig(
                fieldConfigs[field].type,
                fieldConfigs[field],
            );
            return {
                input: result.input.extend({
                    [field]: getZodOptions(zodConfig.input, fieldConfigs[field]),
                }),
                output: result.output.extend({
                    [field]: getZodOptions(zodConfig.output, fieldConfigs[field]),
                }),
                query: result.query.extend({
                    [field]: zodConfig.query,
                }),
            };
        },
        {
            input: z.object({}),
            output: z.object({}),
            query: z.object({}),
        },
    );
    result.query = result.query.partial();
    result.output = result.output.extend({ _id: zObjectId() });
    return result;
}

export function getViewRouteZodIO<
    I extends AnyZodObject,
    O extends AnyZodObject,
    K extends ZodType<string>,
    Q extends AnyZodObject
>(
    baseZod: { input: I; output: O; query: Q },
    _zKeys: K | undefined = undefined,
) {
    const zKeys = (_zKeys ?? baseZod.output.keyof()).or(z.enum(["createAt", "updateAt"]));
    const projectionSchema = z.union([
        zKeys,
        zKeys.array(),
        z.record(
            zKeys,
            z.custom<0 | 1>((v: any) => [0, 1].includes(v)),
        ),
    ]);
    const sortSchema = z.record(
        zKeys,
        z.custom<1 | -1>((v) => [-1, 1].includes(v as any)),
    );
    const optionsSchema = z
        .object({
            sort: sortSchema,
            skip: z.number(),
            limit: z.number(),
            populate: z.array(z.object({ path: zKeys, select: z.any() })),
        })
        .partial();


    //=================================Find One=================================//
    const FindOne = z
        .object({
            where: baseZod.query.optional(),
            select: projectionSchema.optional(),
            options: optionsSchema.optional(),
        })
        .optional();

    const FindOneOutput = baseZod.output;

    //=================================FindMany=================================//
    const FindMany = z
        .object({
            where: z.any(), //baseZod.query.optional(),
            select: projectionSchema.optional(),
            options: optionsSchema.optional(),
        })
        .optional();

    const FindManyOutput = z.object({
        records: FindOneOutput.array(),
        total: z.number(),
        limit: z.number().optional(),
        skip: z.number().optional(),
    });

    //=================================Text Search=================================//
    // @ts-ignore
    const TextSearch = z
        .object({
            text: z.string(),
            select: projectionSchema.optional(),
            options: optionsSchema.optional(),
        })
        .optional()
        .default({ text: "" });

    const TextSearchOutput = z.object({
        records: FindOneOutput.array(),
        total: z.number(),
        limit: z.number().optional(),
        skip: z.number().optional(),
    });
    //=================================FindById=================================//
    const FindById = z.object({
        id: zObjectId(),
        select: projectionSchema.optional(),
        options: optionsSchema.optional(),
    });
    const FindByIdOutput = baseZod.output;
    //=================================FindByIds=================================//
    const FindByIds = z.object({
        ids: z.array(zObjectId()),
        select: projectionSchema.optional(),
        options: optionsSchema.optional(),
    });
    const FindByIdsOutput = z.array(baseZod.output);
    //=============================Export to Excel File ==========================//
    const ExportToExcelFile = z.object({
        template: z.boolean().optional(),
        query: FindMany,
    });
    const ExportToExcelFileOutput = z.string();

    return {
        zKeys,
        FindOne,
        FindOneOutput,
        FindMany,
        FindManyOutput,
        TextSearch,
        TextSearchOutput,
        FindById,
        FindByIdOutput,
        FindByIds,
        FindByIdsOutput,
        ExportToExcelFile,
        ExportToExcelFileOutput
    }

}

export function getBasicRouteZodIO<
    I extends AnyZodObject,
    O extends AnyZodObject,
    K extends ZodType<string>,
    Q extends AnyZodObject,
>(
    baseZod: { input: I; output: O; query: Q },
    _zKeys: K | undefined = undefined,
) {
    const ViewZodIO = getViewRouteZodIO(baseZod, _zKeys);
    //===============================Update One=================================//
    const UpdateOne = z.object({
        id: zObjectId(),
        data: baseZod.input.partial(),
    });
    const UpdateOneOutput = zObjectId();

    //===============================Update Many================================//
    const UpdateMany = UpdateOne.array();
    const UpdateManyOutput = z.array(UpdateOneOutput);

    //===============================Create One=================================//
    const CreateOne = baseZod.input;
    const CreateOneOutput = zObjectId();

    //===============================Create Many================================//
    const CreateMany = baseZod.input.array();
    const CreateManyOutput = z.array(CreateOneOutput);

    //===============================Delete One=================================//
    const DeleteOne = zObjectId();
    const DeleteOneOutput = zObjectId();

    //===============================Delete Many================================//
    const DeleteMany = z.array(zObjectId());
    const DeleteManyOutput = z.array(DeleteOneOutput);

    //===============================Upsert One=================================//
    const UpsertOne = z.object({
        key: ViewZodIO.zKeys,
        data: baseZod.input.partial(),
    });
    const UpsertOneOutput = z.boolean();

    //===============================Upsert Many================================//
    const UpsertMany = z.object({
        key: ViewZodIO.zKeys,
        data: baseZod.input.partial().array(),
    });
    const UpsertManyOutput = z.any();
    //==============================Import Many==================================//

    const ImportManyOutput = z.any();

    //==============================Import From Excel============================//
    const ImportFromExcelFile = z.object({
        fileID: zObjectId(),
        initData: baseZod.input.partial().optional(),
    });
    const ImportFromExcelFileOutput = zImportOutput;

    //==============================Import From Text ============================//
    const ImportFromText = z.object({
        text: z.string(),
        initData: baseZod.input.partial().optional(),
    });
    const ImportFromTextOutput = zImportOutput;

    //==============================Import From Json Array ============================//
    const ImportFromJsonArray = z.array(z.any());
    const ImportFromJsonArrayOutput = zImportOutput;


    return {
        ...ViewZodIO,
        CreateOne,
        CreateOneOutput,
        CreateMany,
        CreateManyOutput,
        DeleteOne,
        DeleteOneOutput,
        DeleteMany,
        DeleteManyOutput,
        ImportFromExcelFile,
        ImportFromExcelFileOutput,
        ImportFromText,
        ImportFromTextOutput,
        ImportFromJsonArray,
        ImportFromJsonArrayOutput,
        UpdateOne,
        UpdateOneOutput,
        UpdateMany,
        UpdateManyOutput,
        UpsertOne,
        UpsertOneOutput,
        UpsertMany,
        UpsertManyOutput,
    };
}