import {findMany} from "./findMany";
import mongoose from "mongoose";
import {getTableFromListData} from "../parsers/TableParsers";
import {ISchemaConfig} from "../../share/types/ISchemaConfig";
import ExcelJS from "exceljs";
import {addTempFiles, initTempFileSlot} from "../file-storage/FileManager";
import dayjs from "dayjs";

export async function exportToExcelFile(
  input: any,
  Model: mongoose.Model<any>,
  schemaConfig: ISchemaConfig<any>,
) {
  let records: any[] = [];
  if (!input.template) {
    // else, export template only
    const data = await findMany(input.query, Model);
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