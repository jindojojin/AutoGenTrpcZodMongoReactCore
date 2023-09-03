import React from "react";
import { ColumnType } from "antd/es/table";
import { FilterFilled, FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ISchemaFieldConfig } from "../../../types/ISchemaDefinition";
import MultiSchemaInput, {
  IMultiSchemaInputProps,
} from "../../Form/inputs/MultiSchemaInput";

function SchemaFilter<T, P extends IMultiSchemaInputProps<any>>(
  config: ISchemaFieldConfig,
  MultiSchemaInput: React.FC<any>
): Partial<ColumnType<T>> {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <MultiSchemaInput
        cardProps={{
          style: { width: 600 },
        }}
        searchInputProps={{
          addonBefore: undefined,
          placeholder: `Search for ${config.label}`,
        }}
        headerRight={
          <Button
            type={"primary"}
            style={{ marginLeft: 5 }}
            onClick={() => {
              confirm();
              close();
            }}
          >
            OK
          </Button>
        }
        onChange={(v: any[]) => {
          if (v.length) setSelectedKeys(v?.map((u) => u._id as any));
          else clearFilters?.();
        }}
      />
    ),
    filterIcon: (filtered: boolean) =>
      filtered ? <FilterFilled /> : <FilterOutlined />,
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => {}, 100);
      }
    },
  };
}

export default SchemaFilter;