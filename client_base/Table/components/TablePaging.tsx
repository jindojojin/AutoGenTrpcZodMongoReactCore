import React, { useContext } from "react";
import { Pagination, Typography } from "antd";
import { ListDataContext } from "../../Common/ListDataContext";
import { useTranslation } from "react-i18next";
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
function TablePaging() {
  const { pageConfig, setPageConfig, total } = useContext(ListDataContext);
  const { t } = useTranslation("table");
  return (
    <Pagination
      total={total ?? 0}
      showTotal={(total) => (
        <Typography.Text strong>Total: {total}</Typography.Text>
      )}
      hideOnSinglePage={true}
      current={pageConfig.skip / pageConfig.limit + 1}
      pageSizeOptions={[10, 20, 30, 50, total ?? 100]}
      defaultPageSize={pageConfig.limit}
      pageSize={pageConfig.limit}
      onChange={(page, pageSize) => {
        console.log(pageSize);
        setPageConfig({
          skip: (page - 1) * pageSize,
          limit: pageSize,
        });
      }}
    />
  );
}

export default TablePaging;