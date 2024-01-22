import {
    createFolderIfNotExist,
    getSchemaFolder,
    getSchemaName,
    getTypeEnumText,
} from "../genUtils";
import {readFileSync, writeFileSync} from "fs";
import path from "path";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

import {GenConfig} from "../../schemas";
import { VIEW_TYPE } from "../../views/ViewTypes";
import { ViewGenConfig } from "../../views";
import { getObjectKeys } from "../../client_base/Common/Utils";

export function autoGenBaseRouterIndex(
    outDir: string,
    GenList: Record<SCHEMA_TYPE, GenConfig>,
) {
    const importLines: string[] = [];
    const export_routerLines: string[] = [];
    Object.keys(GenList).forEach((_key) => {
        const key = _key as SCHEMA_TYPE;
        const ModuleName = getSchemaName(key).SchemaName;
        const genConfig = GenList[key];

        importLines.push(
            `import {${ModuleName}BaseRouter} from "./${getSchemaFolder(
                genConfig?.folder,
            )}${ModuleName}BaseRouter";`,
        );
        export_routerLines.push(
            `[${getTypeEnumText(key)}]: ${ModuleName}BaseRouter()`,
        );
    });

    const filePath = path.resolve(`${outDir}/base_routers/index.ts`);
    createFolderIfNotExist(filePath);
    const template = readFileSync(
        path.resolve("src/templates/BaseRouterIndexTemplate.txt"),
    ).toString();
    const fileContent = template
        .replaceAll("{{imports}}", importLines.join("\n"))
        .replaceAll("{{export_routers}}", export_routerLines.join(",\n  "));
    writeFileSync(filePath, fileContent);
}

export function autoGenBaseRouterIndexForView(
    outDir: string,
    GenList: Record<VIEW_TYPE, ViewGenConfig>,
) {
    const importLines: string[] = [];
    const export_routerLines: string[] = [];
    getObjectKeys(GenList).forEach((key) => {
        const ModuleName = getSchemaName(key).SchemaName;
        const genConfig = GenList[key];

        importLines.push(
            `import {${ModuleName}BaseRouter} from "./${getSchemaFolder(
                genConfig?.folder,
            )}${ModuleName}BaseRouter";`,
        );
        export_routerLines.push(
            `[${getTypeEnumText(key)}]: ${ModuleName}BaseRouter()`,
        );
    });

    const filePath = path.resolve(`${outDir}/base_view_routers/index.ts`);
    createFolderIfNotExist(filePath);
    const template = readFileSync(
        path.resolve("src/templates/BaseRouterIndexTemplateForView.txt"),
    ).toString();
    const fileContent = template
        .replaceAll("{{imports}}", importLines.join("\n"))
        .replaceAll("{{export_routers}}", export_routerLines.join(",\n  "));
    writeFileSync(filePath, fileContent);
}