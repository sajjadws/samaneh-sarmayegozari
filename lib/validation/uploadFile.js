
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const allowedTypes = {
  "image/jpeg": {
    folder: "images",
    extension: ".jpg",
    fileType: "IMAGE",
  },
  "image/png": {
    folder: "images",
    extension: ".png",
    fileType: "IMAGE",
  },
  "application/pdf": {
    folder: "file",
    extension: ".pdf",
    fileType: "PDF",
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    folder: "file",
    extension: ".docx",
    fileType: "DOCUMENT",
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    folder: "file",
    extension: ".xlsx",
    fileType: "DOCUMENT",
  },
};

export async function uploadFile(file) {
  if (!file || file.size === 0) {
    throw new Error("فایل انتخاب نشده است");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("حداکثر حجم فایل 5 مگابایت است");
  }

  const fileInfo = allowedTypes[file.type];

  if (!fileInfo) {
    throw new Error("فرمت فایل مجاز نیست");
  }

  const fileName = `${randomUUID()}${fileInfo.extension}`;

  const uploadPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    fileInfo.folder
  );

  await mkdir(uploadPath, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(
    path.join(uploadPath, fileName),
    buffer,
    { flag: "wx" }
  );

  return {
    fileName,
    filePath: `/uploads/${fileInfo.folder}/${fileName}`,
    fileType: fileInfo.fileType,
  };
}
