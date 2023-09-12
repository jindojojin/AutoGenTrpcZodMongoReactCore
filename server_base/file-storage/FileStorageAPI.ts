import * as fs from "fs";
import path from "path";
import {Express, Request} from "express";
import multer from "multer";
import {
    addTempFiles,
    delayDelete,
    getFiles,
    getTempFiles,
    saveFiles,
    SFile,
    STempFile,
    STORAGE_FOLDER_PATH,
} from "./FileManager";
import archiver from "archiver";

interface MulterRequest extends Request {
  user?: any;
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

export function initStorage(app: Express, folderName: string) {
  const storage = multer.diskStorage({
    destination: (req: any, file: Express.Multer.File, cb: any) => {
      const folder = path.resolve(STORAGE_FOLDER_PATH, folderName);
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: async (req: any, file: Express.Multer.File, cb: any) => {
      const file_name = `${new Date().getTime()}_${file.originalname}`;
      cb(null, file_name);
    },
  });
  const upload = multer({ storage: storage });
  console.log(`Serving ${folderName} at:`, STORAGE_FOLDER_PATH);

  app.post(
    `/storage/${folderName}/single`,
    upload.single("file"),
    async (req, res) => {
      try {
        const Req = req as MulterRequest;
        const file = Req.file;
        if (!file) throw "No upload file";
        let fileID: string;
        if (req.query["temp"]) {
          fileID = addTempFiles(file) as string;
        } else {
          fileID = await saveFiles(file, folderName, Req.user?._id) as string;
        }
        res.send(fileID);
      } catch (e) {
        res.status(500).send(e);
      }
    },
  );
  app.get(`/storage/${folderName}/single/:fileID`, async (req, res) => {
    try {
      const File = (await getFiles(req.params.fileID)) as SFile;
      if (File) {
        const stat = fs.statSync(File.path);
        res.attachment(File.originalname ?? "Unknown_file_name");
        res.writeHead(200, {
          "Content-Type": File.mimetype,
          "Content-Length": stat.size,
        });
        const stream = fs.createReadStream(File.path);
        stream.pipe(res);
      }
    } catch (e) {
      console.log(e);
      res.status(404).send(e);
    }
  });

  app.post(
    `/storage/${folderName}/multi`,
    upload.array("files"),
    async (req, res) => {
      const Req = req as MulterRequest;
      console.log("Upload file", req.query);
      const files = (req as MulterRequest).files;
      if (files) {
        let fileIDs: string[];
        if (req.query["temp"]) {
          fileIDs = addTempFiles(files) as string[];
        } else {
          fileIDs = await saveFiles(files, folderName, Req.user?._id) as string[];
        }
        const result = await saveFiles(files, folderName, Req.user?._id);
        res.send(fileIDs);
      }
    },
  );
  app.post(`/storage/${folderName}/download-zip`, async (req, res) => {
    try {
      const filePath = path.resolve(
        STORAGE_FOLDER_PATH,
        folderName,
        `${new Date().getTime()}_TempFile.zip`,
      );
      const files = (await getFiles(req.body)) as SFile[];
      const output = fs.createWriteStream(filePath); // Tạo file zip mới
      output.on("close", () => {
        console.log(`${archive.pointer()} total bytes`);
        console.log(
          "Archiver has been finalized and the output file descriptor has closed.",
        );
        delayDelete(filePath, 10);
        res.download(
          filePath,
          req.query?.["fileName"]?.toString() ?? "Compress.zip",
        ); // Gửi file zip cho người dùng để download
      });
      const archive = archiver("zip", {
        zlib: { level: 9 }, // Đặt mức nén cao nhất
      });

      archive.on("error", (err: any) => {
        throw err;
      });

      archive.pipe(output); // Pipe output stream của archiver vào output stream mới tạo

      files.forEach((file) => {
        const fileStream = fs.createReadStream(path.resolve(file.path));
        archive.append(fileStream, { name: file.originalname }); // Thêm các file vào file zip
      });
      await archive.finalize(); // Kết thúc quá trình nén và tạo file zip
    } catch (e) {
      res.status(500).send("Cannot create zip file");
    }
  });

  app.get(`/storage/${folderName}/temp/:tempFileID`, (req, res) => {
    try {
      const tempFile = getTempFiles(req.params.tempFileID) as STempFile;
      res.download(tempFile.path, tempFile.filename);
    } catch (e) {
      res.status(404).send(e);
    }
  });
}