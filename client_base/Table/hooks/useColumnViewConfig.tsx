import { ColumnType } from "antd/es/table";
import React, { useCallback, useMemo, useState } from "react";
import { Checkbox, Col, Popover, Row } from "antd";
import { SettingOutlined } from "@ant-design/icons";

/**
 * Trả về columns để truyền vào antd Table + Nút cài đặt ẩn hiện các cột để render vào vị trí tuỳ ý
 * @param columns
 */
export function useColumnViewConfig<T>(columns: ColumnType<T>[]) {
  const allColumns = useMemo(() => {
    return columns.map((e) => e.dataIndex);
  }, [columns]);
  const [checkList, setCheckList] = useState(allColumns);
  const setAll = useCallback(
    (value: any) => {
      if (value.target.checked) {
        setCheckList(allColumns);
      } else {
        setCheckList([]);
      }
    },
    [allColumns]
  );
  const ColumnsCheckList = (
    <Checkbox.Group onChange={setCheckList as any} value={checkList as any}>
      <Row style={{ width: "100%", maxWidth: 400 }}>
        {columns.map((c) => (
          <Col span={12}>
            <Checkbox value={c.dataIndex}>{String(c.title)}</Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
  return {
    ConfigButton: (
      <Popover
        trigger={"click"}
        title={
          <Checkbox defaultChecked={true} onChange={setAll}>
            All
          </Checkbox>
        }
        placement={"leftTop"}
        content={ColumnsCheckList}
      >
        <SettingOutlined title={"Show/Hide columns"} />
      </Popover>
    ),
    columns: columns.filter((c) => checkList.includes(c.dataIndex)),
  };
}