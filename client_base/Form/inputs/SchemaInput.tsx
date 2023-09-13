import { EditOutlined } from "@ant-design/icons";
import { AutoComplete, Col, Input, Row } from "antd";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import {DYNAMIC_CATEGORY_ID} from "../../../share/constants/database_fields";

export interface ISchemaInputProps<T extends FieldValues> {
  value?: T;
  onChange?: (v: T | undefined) => void;
  disabled?: boolean;
  trpcRoute: any;
  unitName?: string;
  headerLeft?: JSX.Element;
  renderItem: (v: T | undefined, searchText?: string) => JSX.Element;
  categoryId: string | undefined; // for Dynamic Table only
  forceUseCategory?: boolean; // allow categoryId=undefined
}
function SchemaInput<T extends FieldValues>(props: ISchemaInputProps<T>) {
  const [tmpValue, setTmpValue] = useState<T | undefined>();
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  return props.value ?? tmpValue ? (
    <Row>
      <Col flex={"auto"}>{props.renderItem(props.value ?? tmpValue)}</Col>
      <Col>
        {!props.disabled && (
          <EditOutlined
            style={{
              margin: 10,
            }}
            onClick={() => {
              setTmpValue(undefined);
              props.onChange?.(undefined);
            }}
          />
        )}
      </Col>
    </Row>
  ) : (
    <Row gutter={[5, 0]}>
      <Col>{props.headerLeft}</Col>
      <Col flex={"auto"}>
        <AutoComplete
          autoFocus={true}
          disabled={props.disabled}
          style={{
            flex: 1,
          }}
          open={openAutoComplete}
          value={searchValue}
          onChange={setSearchValue}
          allowClear
          onFocus={() => setOpenAutoComplete(true)}
          onBlur={() => setOpenAutoComplete(false)}
          options={options.map((op: any) => ({
            value: (op as any)._id,
            label: (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Select", op);
                  props.onChange?.(op);
                  setTmpValue(op);
                  setSearchValue("");
                }}
              >
                {props.renderItem(op, searchValue)}
              </div>
            ),
          }))}
          onSelect={(v, o) => {
            setSearchValue("");
          }}
          onSearch={async (value) => {
            try {
              const listData = await props.trpcRoute.textSearch.query(props.categoryId || props.forceUseCategory
                ? { [DYNAMIC_CATEGORY_ID]: props.categoryId, input: { text: value } }
                : { text: value })
              setOptions(listData.records)
            } catch (error) {

            }

          }}
        >
          <Input.Search
            style={{
              flex: 1,
            }}
            placeholder={`Search for ${props.unitName ?? "item"}`}
          />
        </AutoComplete>
      </Col>
    </Row>
  );
}

export default SchemaInput;