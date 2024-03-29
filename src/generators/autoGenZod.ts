import "fs";
import {readFileSync, writeFileSync} from "fs";
import _ from "lodash";
import path from "path";
import {GenConfig, GenList} from "../../schemas";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {getObjectKeys} from "../../share/CommonFunctions";
import {BASIC_TYPE, DataType, isBasicType, isFileType, isSchemaType,} from "../../share/types/DataTypes";
import {ISchemaDefinition, ISchemaFieldConfig,} from "../../share/types/ISchemaDefinition";
import {ViewGenConfig, ViewGenList} from "../../views";
import {VIEW_TYPE} from "../../views/ViewTypes";
import {createFolderIfNotExist, getRelativePath, getSchemaFolder, getSchemaName,} from "../genUtils";
import {TABLE_API} from "../../custom_apis/TableAPI";
import {TableAPIGen, TableAPIGenConfig} from "../../custom_apis/index.js";

export function getZodType(type: DataType, topType?: DataType) {
  let input;
  let output;
  if (isBasicType(type)) {
    switch (type as BASIC_TYPE) {
      case BASIC_TYPE.DATE:
      case BASIC_TYPE.TIME:
        output = "z.date()";
        break;
      case BASIC_TYPE.TEXT:
        output = "z.string()";
        break;
      case BASIC_TYPE.NUMBER:
        output = "z.number()";
        break;
      case BASIC_TYPE.ENUM:
        output = "z.string()";
        break;
      case BASIC_TYPE.BOOLEAN:
        output = "z.boolean()";
        break;
      case BASIC_TYPE.UNKNOWN:
        output = "z.any()";
        break;
      case BASIC_TYPE.DATE_RANGE:
        output = "z.object({start:z.date(),end:z.date()})";
        break;
      default:
        output = "z.any()";
    }
    input = output;
  } else if (isFileType(type)) {
    input = "z.union([zObjectId(),zTempFileId()])";
    output = //TODO: Chưa chỉnh output cho fileType
      isSchemaType(type) && topType != type
        ? `z${getSchemaName(type as SCHEMA_TYPE).SchemaName}Output${GenList[type as SCHEMA_TYPE].dynamic ? ".passthrough()" : ""
        }.or(zObjectId())`
        : "zObjectId()";
  } else {
    input = "zObjectId()";
    output =
      isSchemaType(type) && topType != type
        ? `z${getSchemaName(type as SCHEMA_TYPE).SchemaName}Output${GenList[type as SCHEMA_TYPE].dynamic ? ".passthrough()" : ""
        }.or(zObjectId())`
        : "zObjectId()";
  }
  return { input, query: `ZodMongoQuery.z$query(${input})`, output };
}

function getFieldFromObj(
    type: SCHEMA_TYPE | VIEW_TYPE | TABLE_API,
    FieldConfig: ISchemaFieldConfig,
    inArray?: boolean,
) {
  if (FieldConfig.private)
    return { input: undefined, query: undefined, output: undefined };
  let result;
  if (Array.isArray(FieldConfig.type)) {
    const field = getZodType(FieldConfig.type[0], type);
    result = {
      input: `z.array(${field.input})`,
      output: `z.array(${field.output})`,
      query: `ZodMongoQuery.z$arrayQuery(${field.query})`,
    };
  } else {
    result = getZodType(FieldConfig.type, type);
    if (_.isArray(FieldConfig.enum) && FieldConfig.enum.length) {
      const output = `z.enum([${(FieldConfig.enum as any[])
        .map((e) => `"${e}"`)
        .join(",")}])`;
      result.output = output;
      result.query = `ZodMongoQuery.z$query(${output})`;
      result.input = output;
    }
  }

  if (!FieldConfig.required) {
    result.output += inArray ? "" : ".optional()";
    result.input += inArray ? "" : ".optional()";
  }
  if (FieldConfig.nullable) {
    result.output += ".nullable()";
    result.input += ".nullable()";
  }
  if (FieldConfig.default != undefined) {
    const defaultValue =
      typeof FieldConfig.default == "string"
        ? `"${FieldConfig.default}"`
        : JSON.stringify(FieldConfig.default);
    result.output += `.default(${defaultValue})`;
    result.input += `.default(${defaultValue})`;
  }
  return result;
}

export function getZodSchema(
    type: SCHEMA_TYPE | VIEW_TYPE | TABLE_API,
    Obj: ISchemaDefinition,
    with_id: boolean = true,
) {
  const zFieldBase: string[][] = [];
  if (with_id) zFieldBase.push(["_id", "zObjectId()"]);
  const zFieldQuery: string[][] = [];
  const zFieldUpdate: string[][] = [];
  Object.keys(Obj).forEach((key) => {
    const field = getFieldFromObj(type, Obj[key]);
    if (field?.output) {
      zFieldBase.push([key, field.output]);
      zFieldQuery.push([key, field.query]);
      zFieldUpdate.push([key, field.input]);
    }
  });
  return {
    output: `z.object({${zFieldBase.map((e) => `${e[0]}:${e[1]}`).join(",")}})`,
    query: `z.object({${zFieldQuery.map((e) => `${e[0]}:${e[1]}`).join(",")}})`,
    input: `z.object({${zFieldUpdate
      .map((e) => `${e[0]}:${e[1]}`)
      .join(",")}})`,
  };
}

function getImportZodList(schema: SCHEMA_TYPE | VIEW_TYPE | TABLE_API) {
  //schema=undefined -> sử dụng cho view --> import tất cả
  const relativePath = isSchemaType(schema) ? getRelativePath(
      GenList[schema as SCHEMA_TYPE].folder,
  ) : getRelativePath((ViewGenList[schema as VIEW_TYPE] ?? TableAPIGen[schema as TABLE_API]).folder) + "../zods/"

  return getObjectKeys(GenList)
  .filter((s) => s != schema)
  .map((otherSchema) => {
    const ModuleName = getSchemaName(otherSchema).SchemaName;
    return `import {z${ModuleName}Input, z${ModuleName}Output} from '${relativePath}${getSchemaFolder(GenList[otherSchema].folder)}z${ModuleName}';`;
  });
}

export function genZodFile(outDir: string, schema_type: SCHEMA_TYPE, genConfig: GenConfig) {
  const ModuleName = getSchemaName(schema_type).SchemaName;
  const template = readFileSync(
    path.resolve("src/templates/ZodTemplate.txt"),
  ).toString();
  const filePath = path.resolve(
    `${outDir}/zods/${getSchemaFolder(
      genConfig.folder,
    )}z${ModuleName}.ts`,
  );
  createFolderIfNotExist(filePath);
  const { output, query, input } = getZodSchema(schema_type, genConfig.schema);
  const fileContent = template
    .replaceAll("{{ZodOutput}}", output)
    .replaceAll("{{ZodQuery}}", query)
    .replaceAll("{{ZodInput}}", input)
    .replaceAll("{{ModuleName}}", ModuleName)
    .replaceAll(
      "{{import_other_zods}}",
      getImportZodList(schema_type).join("\n"),
    )
    .replaceAll("{{RelativePath}}", getRelativePath(genConfig.folder));
  writeFileSync(filePath, fileContent);
}

export function genZodFileForView(outDir: string, view_type: VIEW_TYPE, viewGenConfig: ViewGenConfig) {
  const ViewName = getSchemaName(view_type).SchemaName;
  const template = readFileSync(
    path.resolve("src/templates/ZodViewTemplate.txt"),
  ).toString();
  const filePath = path.resolve(
    `${outDir}/view_zods/${getSchemaFolder(viewGenConfig.folder)}z${ViewName}.ts`,
  );
  createFolderIfNotExist(filePath);
  const {output, query, input} = getZodSchema(view_type, viewGenConfig.view.schema);
  const fileContent = template
  .replaceAll("{{ZodOutput}}", output)
  .replaceAll("{{ZodQuery}}", query)
  .replaceAll("{{ZodInput}}", input)
  .replaceAll("{{ModuleName}}", ViewName)
  .replaceAll(
      "{{import_other_zods}}",
      getImportZodList(view_type).join("\n"),
  )
  .replaceAll("{{RelativePath}}", getRelativePath(viewGenConfig.folder));
  writeFileSync(filePath, fileContent);
}

export function genZodFileForTableAPI(outDir: string, view_type: TABLE_API, viewGenConfig: TableAPIGenConfig) {
  const ViewName = getSchemaName(view_type).SchemaName;
  const template = readFileSync(
      path.resolve("src/templates/ZodViewTemplate.txt"),
  ).toString();
  const filePath = path.resolve(
      `${outDir}/view_zods/${getSchemaFolder(viewGenConfig.folder)}z${ViewName}.ts`,
  );
  createFolderIfNotExist(filePath);
  const {output, query, input} = getZodSchema(view_type, viewGenConfig.config.schema);
  const fileContent = template
  .replaceAll("{{ZodOutput}}", output)
  .replaceAll("{{ZodQuery}}", query)
  .replaceAll("{{ZodInput}}", input)
  .replaceAll("{{ModuleName}}", ViewName)
  .replaceAll(
      "{{import_other_zods}}",
      getImportZodList(view_type).join("\n"),
  )
  .replaceAll("{{RelativePath}}", getRelativePath(viewGenConfig.folder));
  writeFileSync(filePath, fileContent);
}
