import { ISchemaFieldConfig } from "../../../share/types/ISchemaDefinition";
import { ColumnType } from "antd/es/table";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

export function TextFilter<T>(
  config: ISchemaFieldConfig
): Partial<ColumnType<T>> {
  return {
    filterDropdown: (
      // @ts-ignore
      { setSelectedKeys, selectedKeys, confirm, clearFilters, close }
    ) => (
      //@ts-ignore
      <Input.Search
        allowClear
        placeholder={`Search for ${config.label}`}
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys(e.target.value ? [e.target.value] : []);
          if (!e.target.value.length) {
            confirm(); // when user clear search
            close();
          }
        }}
        onPressEnter={() => {
          confirm();
          close();
        }}
        onSearch={(value, event) => {
          confirm();
          close();
        }}
      />
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => {}, 100);
      }
    },
  };
}