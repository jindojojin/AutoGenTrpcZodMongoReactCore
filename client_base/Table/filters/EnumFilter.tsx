import { ColumnType } from "antd/es/table";
import React from "react";
import { FilterOutlined } from "@ant-design/icons";
import ListEnumInput from "../../Form/inputs/ListEnumInput";
import { getEnumTitle } from "../Utils";
import { Button } from "antd";
import { ISchemaFieldConfig } from "../../../share/types/ISchemaDefinition";

export function EnumFilter<T>(
  config: ISchemaFieldConfig
): Partial<ColumnType<T>> {
  return {
    filterDropdown: (
      // @ts-ignore
      { setSelectedKeys, selectedKeys, confirm, clearFilters, close }
    ) => (
      //@ts-ignore
      <>
        <ListEnumInput
          cardProps={{
            style: {
              width: 400,
            },
          }}
          cols={2}
          enumConfig={getEnumTitle(config)}
          value={selectedKeys as string[]}
          onChange={(value: any) => {
            setSelectedKeys(value);
          }}
          headerRight={
            <Button size={"small"} type={"primary"} onClick={() => confirm()}>
              OK
            </Button>
          }
        />
      </>
    ),
    filterIcon: (filtered: boolean) => (
      <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => {}, 100);
      }
    },
  };
}