import {
  CheckOutlined,
  ClearOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Card,
  CardProps,
  Col,
  Input,
  List,
  Row,
} from "antd";
import { SearchProps } from "antd/es/input";
import _ from "lodash";
import { useState } from "react";
import { showIf } from "../../Common/Utils";

export interface IMultiSchemaInputProps<T> {
  value?: T[];
  onChange?: (v: T[]) => void;
  disabled?: boolean;
  trpcRoute: any;
  unitName?: string;
  renderItem: (v: T, searchText?: string) => JSX.Element;
  renderList?: (v: T[]) => JSX.Element;
  cardProps?: CardProps;
  searchInputProps?: SearchProps;
  headerRight?: JSX.Element;
  headerLeft?: JSX.Element;
  categoryId?: string | undefined; // for Dynamic Table only
  forceUseCategory?: boolean; // allow categoryId=undefined
}

function MultiSchemaInput<T extends { _id: any }>(
  props: IMultiSchemaInputProps<T>
) {
  const [tmpValue, setTmpValue] = useState<T[]>();
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<any[]>([]);
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  return (
    <Card
      bodyStyle={{
        padding: 5,
      }}
      size={"small"}
      {...props.cardProps}
      title={
        <Row gutter={[3, 0]}>
          <Col>{props.headerLeft}</Col>
          <Col flex={"auto"} style={{ display: "flex" }}>
            <AutoComplete
              autoFocus={true}
              disabled={props.disabled}
              style={{
                flex: 1,
              }}
              // dropdownMatchSelectWidth={400}
              open={openAutoComplete}
              value={searchValue}
              onChange={setSearchValue}
              allowClear
              onFocus={() => setOpenAutoComplete(true)}
              onBlur={() => setOpenAutoComplete(false)}
              options={options.map((option: any) => ({
                value: option._id,
                label: (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Select", option);
                      // uncheck
                      const values = _.xorBy(
                        props.value ?? tmpValue ?? [],
                        [option],
                        "_id"
                      );
                      console.log(values);
                      props.onChange?.(values);
                      setTmpValue(values);
                      setSearchValue("");
                    }}
                  >
                    <Row>
                      <Col flex={"auto"}>
                        {props.renderItem(option, searchValue)}
                      </Col>
                      <Col>
                        {(props.value ?? tmpValue)?.find(
                          (e) => e._id == option._id
                        ) && <CheckOutlined />}
                      </Col>
                    </Row>
                  </div>
                ),
              }))}
              onSelect={(v, o) => {
                setSearchValue("");
              }}
              onSearch={async (value) => {

                const options = await props.trpcRoute.textSearch.query(props.categoryId || props.forceUseCategory
                  ? { categoryId: props.categoryId, input: { text: value } }
                  : { text: value })
                setOptions(options.records)
              }}
            >
              <Input.Search
                placeholder={`Search for ${props.unitName ?? "item"}`}
                {...(props.searchInputProps ?? {})}
                style={{
                  flex: 1,
                }}
              />
            </AutoComplete>
          </Col>
          <Col>
            {showIf(
              !props.disabled && (props.value ?? tmpValue)?.length,
              <Button
                icon={<ClearOutlined />}
                type={"text"}
                onClick={() => {
                  props.onChange?.([]);
                  setTmpValue([]);
                }}
              >
                Clear all
              </Button>
            )}
            {props.headerRight}
          </Col>
        </Row>
      }
    >
      {props.renderList?.(props.value ?? tmpValue ?? []) ?? (
        <List
          size={"small"}
          dataSource={props.value ?? tmpValue ?? []}
          pagination={{
            pageSize: 8,
            size: "small",
            showTotal: (total) => `Total ${total}`,
          }}
          renderItem={(item) => (
            <List.Item
              actions={[
                showIf(
                  !props.disabled,
                  <MinusCircleOutlined
                    onClick={() => {
                      const value = (props.value ?? tmpValue ?? []).filter(
                        (e) => e != item
                      );
                      props.onChange?.(value);
                      setTmpValue(value);
                    }}
                  />
                ),
              ]}
            >
              {props.renderItem(item)}
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}

export default MultiSchemaInput;