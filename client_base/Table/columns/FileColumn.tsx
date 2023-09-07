import { TableColumValueRender } from "../Types";
import { showIf } from "../../Common/Utils";
import { Button, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { downloadFile } from "../../Common/FileService";

export const FileColumn: TableColumValueRender = (config) => {
  return {
    render: (id) =>
      showIf(
        id,
        <Input
          value={id}
          addonAfter={
            <Button
              style={{ flex: 1, margin: 0 }}
              icon={<DownloadOutlined />}
              onClick={() => downloadFile(id)}
            ></Button>
          }
        />
      ),
  };
};