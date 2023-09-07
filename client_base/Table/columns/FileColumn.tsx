import { TableColumValueRender } from "../Types";
import FileComponent from "../../components/FileComponent";

export const FileColumn: TableColumValueRender = (config) => {
    return {
        render: (file: any) => <FileComponent value={file} showDownload={true} />,
    };
};