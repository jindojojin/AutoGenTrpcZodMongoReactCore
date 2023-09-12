import {DataType} from "./DataTypes";

export type ISchemaDefinition<T extends any = any> = Record<
  keyof T,
  ISchemaFieldConfig
>;
export type ISchemaFieldConfig = {
  /**label: Hiển thị tên cột, tên trường trong form ở phía client*/
  label?: string;
  /**required: Yêu cầu trong trường hợp create/import/update */
  required?: boolean;
  unique?: boolean;
  type: DataType;
  enum?: string[];
  enumLabel?: string[];
  /**hint: Hiển thị gợi ý trong form*/
  hint?: string;
  /** importKey: Khoá được sử dụng thay cho _id trong trường hợp import (upsertMany)   */
  importKey?: boolean;
  /** exportKey: Thông tin này được thêm vào như 1 cột trong bảng export   */
  exportKey?: boolean;
  /**
   * searchKey: Khoá được sử dụng để tìm kiếm bản ghi (vd, tìm kiếm user theo email và sđt)
   */
  searchKey?: boolean;
  nullable?: boolean;
  /**
   * private: Không được trả về trong mọi API được gen tự động (không được khai báo trong zod output)
   */
  private?: boolean;
  min?: number;
  max?: number;
  default?: any;
  /**
   * text: enable text index for textsearch in mongo
   */
  text?: boolean;
  /**
   * orderIdx: Chỉ định vị trí hiển thị của cột trong giao diện bảng, nếu gía trị bằng nhau, xét tiếp thứ tự alphabet
   */
  orderIdx?: number;
  /**
   * hidden: Tự động ẩn khỏi giao diện (phục vụ gen tự động)
   */
  hidden?: boolean;
  immutable?:boolean;
};