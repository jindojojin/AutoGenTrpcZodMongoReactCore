import dayjs from "dayjs";
import ExcelJS from "exceljs";
import { SCHEMA_TYPE } from "../../schemas/SchemaTypes";
import { SCHEMAS_CONFIG } from "../../share/schema_configs";
import { isSchemaType } from "../../share/types/DataTypes";
import { VIEWS_CONFIG } from "../../share/view_configs";
import { VIEW_TYPE } from "../../views/ViewTypes";
import { addTempFiles, initTempFileSlot } from "../file-storage/FileManager";
import { DATABASE_MODELS } from "../mongoose/DatabaseModels";
import { DATABASE_VIEWS } from "../mongoose/DatabaseViews";
import { getTableFromListData } from "../parsers/TableParsers";
import { TRPCContext } from "../trpc";
import { findMany } from "./findMany";

export async function exportToExcelFile(ctx: TRPCContext, schema: SCHEMA_TYPE | VIEW_TYPE,
  input: any
) {
  let records: any[] = [];
  const Model = isSchemaType(schema) ? DATABASE_MODELS[schema as SCHEMA_TYPE] : DATABASE_VIEWS[schema as VIEW_TYPE]
  const schemaConfig = ctx.SchemaConfig ?? (isSchemaType(schema) ? SCHEMAS_CONFIG[schema as SCHEMA_TYPE] : VIEWS_CONFIG[schema as VIEW_TYPE])
  if (!input.template) {
    // else, export template only
    const data = await findMany(ctx, schema, input.query);
    records = data.records;
  }
  const table = getTableFromListData(records, schemaConfig);
  const excelFile = new ExcelJS.Workbook();
  const sheet = excelFile.addWorksheet(schemaConfig.name);
  sheet.addRows(table);

  // Tô màu cho hàng header
  for (let i = 0; i < table[0].length; i++) {
    const headerRow = sheet.getCell(1, i + 1);
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "5A96E3" }, // Mã màu hex hoặc mã màu ARGB
    };
    headerRow.font = {
      color: { argb: "FFFFFFFF" }, // Mã màu hex hoặc mã màu ARGB
    };
  }

  // Căn chỉnh độ rộng cột phù hợp với nội dung
  sheet.columns.forEach((column) => {
    const maxCellLength = column?.values?.reduce(
      (maxLength: number, cell) =>
        Math.max(maxLength, cell ? cell.toString().length : 0),
      0,
    );
    // Giới hạn độ rộng cột là 30
    column.width = Math.min(30, (maxCellLength ?? 500) + 2);
  });

  const ExcelFileForDL = initTempFileSlot(
    `${schemaConfig.name}_Export_${dayjs(new Date()).format(
      "DD_MM_YYYY",
    )}.xlsx`,
  );
  // Lưu workbook thành file Excel
  const data = await excelFile.xlsx.writeFile(ExcelFileForDL.path);
  console.log(`Saved excel: ${ExcelFileForDL.filename}`, data);
  return addTempFiles(ExcelFileForDL) as string;
}