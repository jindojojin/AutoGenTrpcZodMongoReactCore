import { UploadFile } from "antd";
import bytes from "bytes";
import axios, { AxiosResponse } from "axios";

export const MAX_FILE_SIZE = import.meta.env.VITE_MAX_UPLOAD_FILE_SIZE ?? "20M";
const FILE_STORAGE_URL = (import.meta.env.VITE_API_GATEWAY_URL ?? "")+"/storage";

export function getSupportedFiles(files: UploadFile[]) {
  const maxFileSize = bytes(MAX_FILE_SIZE);
  console.log("Max size", maxFileSize);
  console.log(
    "File size",
    files.map((f) => f.size)
  );
  return files.filter((f) => (f.size ?? maxFileSize + 1) <= maxFileSize);
}

export async function uploadFiles(
  files: any | any[],
  temp?: boolean
): Promise<string[]> {
  try {
    const formData = new FormData();
    const isMulti = Array.isArray(files);
    if (isMulti)
      for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        formData.append("files", files[fileIdx]);
      }
    else formData.append("file", files);
    const result = await axios.post(
      `${FILE_STORAGE_URL}${temp ? "/temp" : ""}/file/${
        isMulti ? "multi" : "single"
      }`,
      formData,
      {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    return result.data;
  } catch (e) {
    throw e;
  }
}

export async function downloadFile(id: string, temp?: boolean) {
  try {
    if (!temp) {
      const response = await axios.get(`${FILE_STORAGE_URL}/file/${id}`, {
        responseType: "blob",
      });
      streamFileDownload(response);
    } else {
      const link = document.createElement("a");
      link.href = `${FILE_STORAGE_URL}/file/temp/${id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function downloadZip(ids: string[]) {
  try {
    const response = await axios.post(
      `${FILE_STORAGE_URL}/file/download-zip`,
      ids,
      {
        responseType: "blob",
      }
    );
    streamFileDownload(response);
  } catch (e) {
    console.log(e);
  }
}

function streamFileDownload(response: AxiosResponse, filename?: string) {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  const matches = /filename="(.*)"/g.exec(
    response.headers["content-disposition"]
  );

  link.setAttribute("download", matches?.[1] ?? filename ?? "DownloadFile");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}