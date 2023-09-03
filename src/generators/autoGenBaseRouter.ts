import {readFileSync, writeFileSync} from "fs";
import {
    createFolderIfNotExist, GenConfig,
    getRelativePath,
    getSchemaFolder,
    getSchemaName,
    getTypeEnumText,
} from "../../server_base/genUtils";
import path from "path";
import {pascalCase} from "change-case";
import {getObjectKeys} from "../../share/CommonFunctions";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

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
    createMany: "input, DATABASE_MODELS[{{DataType}}]",
    createOne: "input, DATABASE_MODELS[{{DataType}}]",
    deleteMany: "input, DATABASE_MODELS[{{DataType}}]",
    deleteOne: "input, DATABASE_MODELS[{{DataType}}]",
    exportToExcelFile:
        "input,DATABASE_MODELS[{{DataType}}],SCHEMAS_CONFIG[{{DataType}}]",
    findById: "input, DATABASE_MODELS[{{DataType}}]",
    findByIds: "input, DATABASE_MODELS[{{DataType}}]",
    findMany: "input, DATABASE_MODELS[{{DataType}}]",
    findOne: "input, DATABASE_MODELS[{{DataType}}]",
    importFromExcelFile:
        "input,ZOD_INPUTS[{{DataType}}],DATABASE_MODELS[{{DataType}}],SCHEMAS_CONFIG[{{DataType}}]",
    importFromJsonArray:
        "input,ZOD_INPUTS[{{DataType}}],DATABASE_MODELS[{{DataType}}],SCHEMAS_CONFIG[{{DataType}}]",
    importFromText:
        "input,ZOD_INPUTS[{{DataType}}],DATABASE_MODELS[{{DataType}}],SCHEMAS_CONFIG[{{DataType}}]",
    textSearch:
        "input, DATABASE_MODELS[{{DataType}}], SCHEMAS_CONFIG[{{DataType}}]",
    updateMany: "input, DATABASE_MODELS[{{DataType}}]",
    updateOne: "input, DATABASE_MODELS[{{DataType}}]",
    upsertMany: "input, DATABASE_MODELS[{{DataType}}]",
    upsertOne: "input, DATABASE_MODELS[{{DataType}}]",
};

const DynamicRouterParamsCodeMap = {
    createMany: "input.input, DATABASE_MODELS[{{DataType}}]",
    createOne: "input.input, DATABASE_MODELS[{{DataType}}]",
    deleteMany: "input.input, DATABASE_MODELS[{{DataType}}]",
    deleteOne: "input.input, DATABASE_MODELS[{{DataType}}]",
    exportToExcelFile:
        "input.input, DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig",
    findById: "input.input, DATABASE_MODELS[{{DataType}}]",
    findByIds: "input.input, DATABASE_MODELS[{{DataType}}]",
    findMany: "input.input, DATABASE_MODELS[{{DataType}}]",
    findOne: "input.input, DATABASE_MODELS[{{DataType}}]",
    importFromExcelFile:
        "input.input,ctx.ZodBase.input,DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig",
    importFromJsonArray:
        "input.input,ctx.ZodBase.input,DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig",
    importFromText:
        "input.input,ctx.ZodBase.input,DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig",
    textSearch: "input.input,DATABASE_MODELS[{{DataType}}],ctx.SchemaConfig",
    updateMany: "input.input, DATABASE_MODELS[{{DataType}}]",
    updateOne: "input.input, DATABASE_MODELS[{{DataType}}]",
    upsertMany: "input.input, DATABASE_MODELS[{{DataType}}]",
    upsertOne: "input.input, DATABASE_MODELS[{{DataType}}]",
};

function getRouterCode(functionName: string, dynamic?: boolean) {
    const zod_name = pascalCase(functionName);
    if (dynamic)
        return `${functionName}: dynamicTableProcedure(DynamicParams,
      "${zod_name}",
      "${zod_name}Output"
    ).${RouterMethodMap[functionName as keyof typeof RouterMethodMap]}(async ({ ctx, input }) => {
      const result = await DB_FUNC.${functionName}(${DynamicRouterParamsCodeMap[functionName as keyof typeof DynamicRouterParamsCodeMap]});
      return ctx.ZodOutput.parseAsync(result);
    })`;
    return `${functionName}: publicProcedure
      .input(ZOD_APIS[{{DataType}}].${zod_name})
      .output(ZOD_APIS[{{DataType}}].${zod_name}Output)
      .${RouterMethodMap[functionName as keyof typeof RouterMethodMap]}(({ input }) => DB_FUNC.${functionName}(${RouterParamsCodeMap[functionName as keyof typeof RouterMethodMap]}))`;
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
