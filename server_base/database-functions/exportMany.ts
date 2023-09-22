import {findMany} from "./findMany";
import {getTableFromListData} from "../parsers/TableParsers";
import ExcelJS from "exceljs";
import {addTempFiles, initTempFileSlot} from "../file-storage/FileManager";
import dayjs from "dayjs";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";
import {TRPCContext} from "../trpc";
import {DATABASE_MODELS} from "../mongoose/DatabaseModels";
import {SCHEMAS_CONFIG} from "../../share/schema_configs";

export async function exportToExcelFile(ctx: TRPCContext, schema: SCHEMA_TYPE,
                                        input: any
) {
  let records: any[] = [];
  const Model = DATABASE_MODELS[schema]
  const schemaConfig = ctx.SchemaConfig ?? SCHEMAS_CONFIG[schema]
  if (!input.template) {
    // else, export template only
    const data = await findMany(ctx,schema,input.query);
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