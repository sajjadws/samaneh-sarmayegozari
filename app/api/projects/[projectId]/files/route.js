
import { uploadFile } from "@/lib/validation/uploadFile";
import { unlink } from "fs/promises";
import path from "path";
import prismaِDB from "@/lib/prisma/prismaDB";

export async function POST(req, context) {
  const uploadedFiles = [];

  try {
    const { projectId } = await context.params;

    if (!projectId) {
      return Response.json(
        { message: "شناسه پروژه ارسال نشده است" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true },
    });

    if (!project) {
      return Response.json(
        { message: "پروژه پیدا نشد" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const coverImage = formData.get("image");
    const images = formData.getAll("images");
    const documents = formData.getAll("documents");

    const files = [
      ...(coverImage instanceof File ? [coverImage] : []),
      ...images.filter((file) => file instanceof File),
      ...documents.filter((file) => file instanceof File),
    ];

    if (files.length === 0) {
      return Response.json({
        success: true,
        data: [],
      });
    }

    // ذخیره فایل‌ها روی سرور
    for (const file of files) {
      const result = await uploadFile(file);
      uploadedFiles.push(result);
    }

    // ثبت اطلاعات فایل‌ها در دیتابیس
    const result = await prisma.fileProject.createMany({
      data: uploadedFiles.map((file) => ({
        fileName: file.fileName,
        filePath: file.filePath,
        fileType: file.fileType,
        projectId,
      })),
    });

    return Response.json({
      success: true,
      message: "فایل‌ها با موفقیت ذخیره شدند",
      data: uploadedFiles,
      count: result.count,
    });

  } catch (error) {
    // پاک کردن فایل‌های ذخیره‌شده در صورت بروز خطا
    await Promise.all(
      uploadedFiles.map((file) =>
        unlink(
          path.join(
            process.cwd(),
            "public",
            file.filePath.slice(1)
          )
        ).catch(() => {})
      )
    );

    console.error("Project Upload Error:", error);

    return Response.json(
      {
        message: error.message || "خطا در ذخیره فایل‌ها",
      },
      { status: 400 }
    );
  }
}
