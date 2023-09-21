import {readFileSync, writeFileSync} from "fs";
import {createFolderIfNotExist, getRelativePath, getSchemaFolder, getSchemaName, getTypeEnumText,} from "../genUtils";
import path from "path";
import {pascalCase} from "change-case";
import {getObjectKeys} from "../../share/CommonFunctions";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

import {GenConfig} from "../../schemas";

const RouterMethodMap = {
    createMany: "mutation",
    createOne: "mutation",
    deleteMany: "mutation",
    deleteOne: "mutation",
    exportToExcelFile: "mutation",
    findById: "query",
    findByIds: "mutation",
    findMany: "mutation",
    findOne: "query",
    importFromExcelFile: "mutation",
    importFromJsonArray: "mutation",
    importFromText: "mutation",
    textSearch: "query",
    updateMany: "mutation",
    updateOne: "mutation",
    upsertMany: "mutation",
    upsertOne: "mutation",
};

const RouterParamsCodeMap = {
    createMany: "ctx, input, DATABASE_MODELS[{{DataType}}]",
    createOne: "ctx, input, {{DataType}}",
    deleteMany: "input, DATABASE_MODELS[{{DataType}}]",
    deleteOne: "input, DATABASE_MODELS[{{DataType}}]",
    exportToExcelFile:
        "input,DATABASE_MODELS[{{DataType}}],SCHEMAS_CONFIG[{{DataType}}]",
    findById: "input, DATABASE_MODELS[{{DataType}}]",
    findByIds: "input, DATABASE_MODELS[{{DataType}}]",
    findMany: "input, DATABASE_MODELS[{{DataType}}],SCHEMAS_CONFIG[{{DataType}}]",
    findOne: "input, DATABASE_MODELS[{{DataType}}]",
    importFromExcelFile:
        "ctx, input,ZOD_INPUTS[{{DataType}}],DATABASE_MODELS[{{DataType}}],SCHEMAS_CONFIG[{{DataType}}]",
    importFromJsonArray:
        "ctx, input,ZOD_INPUTS[{{DataType}}],DATABASE_MODELS[{{DataType}}],SCHEMAS_CONFIG[{{DataType}}]",
    importFromText:
        "ctx, input,ZOD_INPUTS[{{DataType}}],DATABASE_MODELS[{{DataType}}],SCHEMAS_CONFIG[{{DataType}}]",
    textSearch:
        "input, DATABASE_MODELS[{{DataType}}], SCHEMAS_CONFIG[{{DataType}}]",
    updateMany: "ctx, input, DATABASE_MODELS[{{DataType}}]",
    updateOne: "ctx, input,{{DataType}}",
    upsertMany: "ctx, input, DATABASE_MODELS[{{DataType}}]",
    upsertOne: "ctx, input, DATABASE_MODELS[{{DataType}}]",
};

const DynamicRouterParamsCodeMap = {
    createMany: "ctx,input.input, DATABASE_MODELS[{{DataType}}]",
    createOne: "ctx,input.input, {{DataType}}",
    deleteMany: "input.input, DATABASE_MODELS[{{DataType}}]",
    deleteOne: "input.input, DATABASE_MODELS[{{DataType}}]",
    exportToExcelFile:
        "input.input, DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig as any",
    findById: "input.input, DATABASE_MODELS[{{DataType}}]",
    findByIds: "input.input, DATABASE_MODELS[{{DataType}}]",
    findMany: "input.input, DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig as any",
    findOne: "input.input, DATABASE_MODELS[{{DataType}}]",
    importFromExcelFile:
        "ctx, input.input,ctx.ZodBase?.input as any,DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig as any",
    importFromJsonArray:
        "ctx, input.input,ctx.ZodBase?.input as any,DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig as any",
    importFromText:
        "ctx, input.input,ctx.ZodBase?.input as any,DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig as any",
    textSearch: "input.input,DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig as any",
    updateMany: "ctx, input.input, DATABASE_MODELS[{{DataType}}]",
    updateOne: "ctx, input.input, {{DataType}}",
    upsertMany: "ctx, input.input, DATABASE_MODELS[{{DataType}}]",
    upsertOne: "ctx, input.input, DATABASE_MODELS[{{DataType}}]",
};

function getRouterCode(functionName: string, dynamic?: boolean) {
    const zod_name = pascalCase(functionName);
    if (dynamic)
        return `${functionName}: dynamicTableProcedure(DynamicParams,
      "${zod_name}",
      "${zod_name}Output"
    ).${RouterMethodMap[functionName as keyof typeof RouterMethodMap]}(async ({ ctx, input }) => {
      const result = await DB_FUNC.${functionName}(${DynamicRouterParamsCodeMap[functionName as keyof typeof DynamicRouterParamsCodeMap]});
      return ctx.ZodOutput?.parseAsync(result);
    })`;
    return `${functionName}: protectedProcedure
      .input(ZOD_APIS[{{DataType}}].${zod_name})
      .${RouterMethodMap[functionName as keyof typeof RouterMethodMap]}(({ ctx, input }) => DB_FUNC.${functionName}(${RouterParamsCodeMap[functionName as keyof typeof RouterMethodMap]}))`;
}

export function genBaseRouter(outDir: string,schema_type:SCHEMA_TYPE, genConfig: GenConfig) {
    const ModuleName = getSchemaName(schema_type).SchemaName;
    const template = readFileSync(
        path.resolve(
            `src/templates/${
                genConfig.dynamic ? "Dynamic" : ""
            }BaseRouterTemplate.txt`,
        ),
    ).toString();
    const filePath = path.resolve(
        `${outDir}/base_routers/${getSchemaFolder(
            genConfig.folder,
        )}${ModuleName}BaseRouter.ts`,
    );
    createFolderIfNotExist(filePath);

    const routersCode = getObjectKeys(RouterMethodMap)
        .filter((fn) => !genConfig.excludeFunctions?.includes(fn))
        .map((fn) => getRouterCode(fn, genConfig.dynamic != null));

    const fileContent = template
        .replaceAll("{{routerCodes}}", routersCode.join(",\n\n    "))
        .replaceAll("{{ModuleName}}", ModuleName)
        .replaceAll("{{schemaType}}", getTypeEnumText(schema_type))
        .replaceAll("{{SchemaFolder}}", getSchemaFolder(genConfig.folder))
        .replaceAll("{{RelativePath}}", getRelativePath(genConfig.folder))
        .replaceAll("{{DataType}}", getTypeEnumText(schema_type))
        .replaceAll("{{DATA_NAME}}",getTypeEnumText(schema_type))
        .replaceAll("{{CATEGORY_NAME}}",getTypeEnumText(genConfig.dynamic?.category as SCHEMA_TYPE))
        .replaceAll("{{PROPERTY_NAME}}",getTypeEnumText(genConfig.dynamic?.property as SCHEMA_TYPE))
        .replaceAll(
            "{{PropertyType}}",
            genConfig.dynamic ? getTypeEnumText(genConfig.dynamic?.property) : "",
        )
        .replaceAll(
            "{{CategoryType}}",
            genConfig.dynamic ? getTypeEnumText(genConfig.dynamic?.category) : "",
        );
    writeFileSync(filePath, fileContent);
}