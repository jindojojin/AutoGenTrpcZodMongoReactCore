import {pascalCase} from "change-case";
import {readFileSync, writeFileSync} from "fs";
import path from "path";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {getObjectKeys} from "../../share/CommonFunctions";
import {createFolderIfNotExist, getRelativePath, getSchemaFolder, getSchemaName, getTypeEnumText,} from "../genUtils";

import {GenConfig} from "../../schemas";
import {ViewGenConfig} from "../../views";
import {VIEW_TYPE} from "../../views/ViewTypes";
import {TABLE_API} from "../../custom_apis/TableAPI";
import {TableAPIGenConfig} from "../../custom_apis/index.js";
import {TableApiDefinition} from "../../share/types/IViewDefinition";
import {getZodSchema} from "./autoGenZod";

const TableAPIRouterMethodMap = {
    exportToExcelFile: "mutation",
    textSearch: "query",
    findMany: "mutation",
}

const ViewRouterMethodMap = {
    ...TableAPIRouterMethodMap,
    findOne: "query",
    findById: "query",
    findByIds: "mutation",
}

const RouterMethodMap = {
    ...ViewRouterMethodMap,
    createMany: "mutation",
    createOne: "mutation",
    deleteMany: "mutation",
    deleteOne: "mutation",

    importFromExcelFile: "mutation",
    importFromJsonArray: "mutation",
    importFromText: "mutation",

    updateMany: "mutation",
    updateOne: "mutation",
    upsertMany: "mutation",
    upsertOne: "mutation",
};

function getTableRouterCode(functionName: string, config: TableApiDefinition) {
    return `${functionName}: protectedProcedure.input(
        ZOD_APIS[{{DataType}}].${pascalCase(functionName)}.merge(${getZodSchema(config.viewOn, config.parameters).input}))
      .mutation(async ({ ctx, input }) => {
        const pineline = TableAPIGen[{{DataType}}].config.pineline(${getObjectKeys(config.parameters).map(p => `input.${p}`)});
        return DB_FUNC.${functionName}(
          ctx,
          {{DataType}},
          input,
          (stages) => [pineline, stages],
        );
      })`;

}


function getRouterCode(functionName: string, dynamic?: boolean, params?: string[]) {
    const zod_name = pascalCase(functionName);
    if (dynamic)
        return `${functionName}: dynamicTableProcedure(DynamicParams,
      "${zod_name}",
      "${zod_name}Output"
    ).${RouterMethodMap[functionName as keyof typeof RouterMethodMap]}(async ({ ctx, input }) => {
      const result = await DB_FUNC.${functionName}(ctx, {{DataType}}, input.input);
      return ctx.ZodOutput?.parseAsync(result);
    })`;
    return `${functionName}: protectedProcedure
      .input(ZOD_APIS[{{DataType}}].${zod_name})
      .${RouterMethodMap[functionName as keyof typeof RouterMethodMap]}(({ ctx, input }) => DB_FUNC.${functionName}(ctx, {{DataType}}, input ${params ? `,${params.join(",")}` : ""}))`;
}

export function genBaseRouter(outDir: string, schema_type: SCHEMA_TYPE, genConfig: GenConfig) {
    const ModuleName = getSchemaName(schema_type).SchemaName;
    const template = readFileSync(
        path.resolve(
            `src/templates/${genConfig.dynamic ? "Dynamic" : ""
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
        .replaceAll("{{DATA_NAME}}", getTypeEnumText(schema_type))
        .replaceAll("{{CATEGORY_NAME}}", getTypeEnumText(genConfig.dynamic?.category as SCHEMA_TYPE))
        .replaceAll("{{PROPERTY_NAME}}", getTypeEnumText(genConfig.dynamic?.property as SCHEMA_TYPE))
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

export function genBaseRouterForView(outDir: string, view_type: VIEW_TYPE, viewGenConfig: ViewGenConfig) {
    const ModuleName = getSchemaName(view_type).SchemaName;
    const template = readFileSync(
        path.resolve(
            `src/templates/BaseRouterTemplateForView.txt`,
        ),
    ).toString();
    const filePath = path.resolve(
        `${outDir}/base_view_routers/${getSchemaFolder(viewGenConfig.folder)}${ModuleName}BaseRouter.ts`,
    );
    createFolderIfNotExist(filePath);

    const routersCode = getObjectKeys(ViewRouterMethodMap)
    .filter((fn) => !viewGenConfig.excludeFunctions?.includes(fn))

    .map((fn) => getRouterCode(fn));

    const fileContent = template
    .replaceAll("{{routerCodes}}", routersCode.join(",\n\n    "))
    .replaceAll("{{ModuleName}}", ModuleName)
    .replaceAll("{{schemaType}}", getTypeEnumText(view_type))
    .replaceAll("{{SchemaFolder}}", getSchemaFolder(viewGenConfig.folder))
    .replaceAll("{{RelativePath}}", getRelativePath(viewGenConfig.folder))
    .replaceAll("{{DataType}}", getTypeEnumText(view_type))
    .replaceAll("{{DATA_NAME}}", getTypeEnumText(view_type))
    // .replaceAll("{{CATEGORY_NAME}}", getTypeEnumText(viewGenConfig.dynamic?.category as SCHEMA_TYPE))
    // .replaceAll("{{PROPERTY_NAME}}", getTypeEnumText(viewGenConfig.dynamic?.property as SCHEMA_TYPE))
    .replaceAll(
        "{{PropertyType}}", "",
    )
    .replaceAll(
        "{{CategoryType}}", "",
    );
    writeFileSync(filePath, fileContent);
}


export function genBaseRouterTableAPI(outDir: string, view_type: TABLE_API, viewGenConfig: TableAPIGenConfig) {
    const ModuleName = getSchemaName(view_type).SchemaName;
    const template = readFileSync(
        path.resolve(
            `src/templates/BaseRouterTemplateForView.txt`,
        ),
    ).toString();
    const filePath = path.resolve(
        `${outDir}/base_view_routers/${getSchemaFolder(viewGenConfig.folder)}${ModuleName}BaseRouter.ts`,
    );
    createFolderIfNotExist(filePath);

    const routersCode = getObjectKeys(TableAPIRouterMethodMap)
    .map((fn) => getTableRouterCode(fn, viewGenConfig.config));

    const fileContent = template
    .replaceAll("{{routerCodes}}", routersCode.join(",\n\n    "))
    .replaceAll("{{ModuleName}}", ModuleName)
    .replaceAll("{{schemaType}}", getTypeEnumText(view_type))
    .replaceAll("{{SchemaFolder}}", getSchemaFolder(viewGenConfig.folder))
    .replaceAll("{{RelativePath}}", getRelativePath(viewGenConfig.folder))
    .replaceAll("{{DataType}}", getTypeEnumText(view_type))
    .replaceAll("{{ViewOn}}", getTypeEnumText(viewGenConfig.config.viewOn))
    .replaceAll("{{DATA_NAME}}", getTypeEnumText(view_type))
    .replaceAll(
        "{{PropertyType}}", "",
    )
    .replaceAll(
        "{{CategoryType}}", "",
    );
    writeFileSync(filePath, fileContent);
}
