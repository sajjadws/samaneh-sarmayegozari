"use server";

import prismaDB from "@/lib/prisma/prismaDB";
import { routes } from "@/lib/routes/routes";
import { auth } from "@/lib/authentication/auth";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// وضعیت‌های مجاز پروژه مطابق Prisma Schema
const PROJECT_STATUSES = [
  "FUNDRAISING",
  "IN_PROGRESS",
  "COMPLETED",
];

// مسیر صفحه پروژه‌ها
const PROJECTS_PATH = "routes.panel.myProjects";

// ------------------------------------------
// 1. دریافت تمام پروژه‌ها
// ------------------------------------------

export const getAllProjects = async (options = {}) => {
  try {
    const page = Math.max(1, Number(options.page) || 1);
    const perPage = Math.max(1, Number(options.perPage) || 10);

    const skip = (page - 1) * perPage;
    const take = perPage;

    const searchString = options.q?.trim() || "";

    // فیلتر جستجو
    const where = searchString
      ? {
          OR: [
            {
              title: {
                contains: searchString,
              },
            },
            {
              description: {
                contains: searchString,
              },
            },
          ],
        }
      : {};

    // تعداد کل پروژه‌ها
    const total = await prismaDB.Project.count({
      where,
    });

    // دریافت پروژه‌ها
    const data = await prismaDB.Project.findMany({
      where,

      skip,
      take,

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        title: true,
        description: true,
        durationDate: true,
        status: true,
        isPublication: true,
        usrId: true,
        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      ok: true,
      status: 200,

      data: {
        data,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },

      message: "پروژه‌ها با موفقیت دریافت شدند.",
    };
  } catch (error) {
    console.error("خطا در دریافت پروژه‌ها:", error);

    return {
      ok: false,
      status: 500,
      data: null,
      message: "دریافت پروژه‌ها با خطا مواجه شد.",
    };
  }
};


// ------------------------------------------
// 2. دریافت یک پروژه با شناسه
// ------------------------------------------

export const getProjectById = async (id) => {
  try {
    if (!id) {
      return {
        ok: false,
        status: 400,
        message: "شناسه پروژه ارسال نشده است.",
      };
    }

    const data = await prismaDB.Project.findUnique({
      where: {
        id: String(id),
      },

      select: {
        id: true,
        title: true,
        description: true,
        durationDate: true,
        status: true,
        isPublication: true,
        usrId: true,
        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            name: true,
          },
        },

        phases: {
          orderBy: {
            createdAt: "desc",
          },
        },

        questionProjects: true,
      },
    });

    if (!data) {
      return {
        ok: false,
        status: 404,
        data: null,
        message: "پروژه موردنظر پیدا نشد.",
      };
    }

    return {
      ok: true,
      status: 200,
      data,
      message: "پروژه با موفقیت دریافت شد.",
    };
  } catch (error) {
    console.error("خطا در دریافت پروژه:", error);

    return {
      ok: false,
      status: 500,
      data: null,
      message: "دریافت پروژه ناموفق بود.",
    };
  }
};


// ------------------------------------------
// 3. ایجاد پروژه جدید
// ------------------------------------------

export const createProject = async (values) => {
  try {
    // بررسی ورود کاربر
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        ok: false,
        status: 401,
        message: "برای ثبت پروژه ابتدا وارد حساب کاربری شوید.",
      };
    }

    // بررسی اطلاعات فرم
    const title = values.title?.trim();
    const description = values.description?.trim();
    const durationDate = values.durationDate?.trim();

    if (!title || !description || !durationDate) {
      return {
        ok: false,
        status: 400,
        message: "عنوان، توضیحات و مدت پروژه الزامی هستند.",
      };
    }

    if (title.length > 50 || description.length > 255) {
      return {
        ok: false,
        status: 400,
        message: "طول عنوان یا توضیحات بیشتر از حد مجاز است.",
      };
    }

    const status = values.status || "FUNDRAISING";

    if (!PROJECT_STATUSES.includes(status)) {
      return {
        ok: false,
        status: 400,
        message: "وضعیت پروژه معتبر نیست.",
      };
    }

    const isPublication = values.isPublication ?? false;

    if (typeof isPublication !== "boolean") {
      return {
        ok: false,
        status: 400,
        message: "وضعیت انتشار باید Boolean باشد.",
      };
    }

    // ثبت پروژه
    const data = await prismaDB.Project.create({
      data: {
        title,
        description,
        durationDate,

        status,
        isPublication,

        // اتصال پروژه به کاربر واردشده
        usrId: session.user.id,
      },

      select: {
        id: true,
        title: true,
        description: true,
        durationDate: true,
        status: true,
        isPublication: true,
        usrId: true,
        createdAt: true,
      },
    });

    revalidatePath(PROJECTS_PATH);
    revalidatePath("/");

    return {
      ok: true,
      status: 201,
      data,
      message: "پروژه با موفقیت ثبت شد.",
    };
  } catch (error) {
    console.error("خطا در ایجاد پروژه:", error);

    return {
      ok: false,
      status: 500,
      message: "ثبت پروژه با خطا مواجه شد.",
    };
  }
};


// ------------------------------------------
// 4. ویرایش پروژه
// ------------------------------------------

export const editProject = async (id, values) => {
  try {
    if (!id) {
      return {
        ok: false,
        status: 400,
        message: "شناسه پروژه ارسال نشده است.",
      };
    }

    // بررسی ورود کاربر
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        ok: false,
        status: 401,
        message: "برای ویرایش پروژه ابتدا وارد حساب کاربری شوید.",
      };
    }

    // پیدا کردن پروژه
    const existingProject = await prismaDB.Project.findUnique({
      where: {
        id: String(id),
      },

      select: {
        id: true,
        usrId: true,
      },
    });

    if (!existingProject) {
      return {
        ok: false,
        status: 404,
        message: "پروژه موردنظر پیدا نشد.",
      };
    }

    // بررسی مالکیت پروژه
    if (existingProject.usrId !== session.user.id) {
      return {
        ok: false,
        status: 403,
        message: "شما اجازه ویرایش این پروژه را ندارید.",
      };
    }

    // آماده‌سازی اطلاعات ویرایش
    const updateData = {};

    if (values.title !== undefined) {
      const title = values.title.trim();

      if (!title || title.length > 50) {
        return {
          ok: false,
          status: 400,
          message: "عنوان پروژه معتبر نیست.",
        };
      }

      updateData.title = title;
    }

    if (values.description !== undefined) {
      const description = values.description.trim();

      if (!description || description.length > 255) {
        return {
          ok: false,
          status: 400,
          message: "توضیحات پروژه معتبر نیست.",
        };
      }

      updateData.description = description;
    }

    if (values.durationDate !== undefined) {
      const durationDate = values.durationDate.trim();

      if (!durationDate) {
        return {
          ok: false,
          status: 400,
          message: "مدت پروژه الزامی است.",
        };
      }

      updateData.durationDate = durationDate;
    }

    if (values.status !== undefined) {
      if (!PROJECT_STATUSES.includes(values.status)) {
        return {
          ok: false,
          status: 400,
          message: "وضعیت پروژه معتبر نیست.",
        };
      }

      updateData.status = values.status;
    }

    if (values.isPublication !== undefined) {
      if (typeof values.isPublication !== "boolean") {
        return {
          ok: false,
          status: 400,
          message: "وضعیت انتشار معتبر نیست.",
        };
      }

      updateData.isPublication = values.isPublication;
    }

    if (Object.keys(updateData).length === 0) {
      return {
        ok: false,
        status: 400,
        message: "اطلاعاتی برای ویرایش ارسال نشده است.",
      };
    }

    // بروزرسانی پروژه
    const data = await prismaDB.Project.update({
      where: {
        id: String(id),
      },

      data: updateData,
    });

    revalidatePath(PROJECTS_PATH);
    revalidatePath("/");

    return {
      ok: true,
      status: 200,
      data,
      message: "پروژه با موفقیت ویرایش شد.",
    };
  } catch (error) {
    console.error("خطا در ویرایش پروژه:", error);

    return {
      ok: false,
      status: 500,
      message: "ویرایش پروژه با خطا مواجه شد.",
    };
  }
};


// ------------------------------------------
// 5. حذف پروژه
// ------------------------------------------

export const deleteProject = async (id) => {
  try {
    if (!id) {
      return {
        ok: false,
        status: 400,
        message: "شناسه پروژه ارسال نشده است.",
      };
    }

    // بررسی ورود کاربر
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        ok: false,
        status: 401,
        message: "برای حذف پروژه ابتدا وارد حساب کاربری شوید.",
      };
    }

    // بررسی وجود پروژه و مالکیت آن
    const existingProject = await prismaDB.Project.findUnique({
      where: {
        id: String(id),
      },

      select: {
        id: true,
        usrId: true,
      },
    });

    if (!existingProject) {
      return {
        ok: false,
        status: 404,
        message: "پروژه موردنظر پیدا نشد.",
      };
    }

    if (existingProject.usrId !== session.user.id) {
      return {
        ok: false,
        status: 403,
        message: "شما اجازه حذف این پروژه را ندارید.",
      };
    }

    // حذف پروژه
    const data = await prismaDB.Project.delete({
      where: {
        id: String(id),
      },
    });

    revalidatePath(PROJECTS_PATH);
    revalidatePath("/");

    return {
      ok: true,
      status: 200,
      data,
      message: "پروژه با موفقیت حذف شد.",
    };
  } catch (error) {
    console.error("خطا در حذف پروژه:", error);

    return {
      ok: false,
      status: 500,
      message: "حذف پروژه با خطا مواجه شد.",
    };
  }
};


export const getApprovedProject = async () => {
  const posts = await prismaDB.Project.findMany({
    where: {
      status: "APPROVED",
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return posts;
};

export async function getApprovedProjectTable() {
  try {
    const posts = await prismaDB.Project.findMany({
      where: {
        status: "APPROVED",
      },
      include: {
        user: true,
        category: true,
      },
      orderBy: {
        title: "asc",
      },
    });

    return {
      ok: true,
      data: posts.map((Project) => ({
        id: Project.id,
        title: Project.title,
        description: Project.description,
        status: Project.status,
        categoryTitle: Project.category.title,
      })),
    };
  } catch (error) {
    console.error("خطا در دریافت پست‌های تأییدشده:", error);

    return {
      ok: false,
      data: [],
      message: "دریافت پست‌های تأییدشده با خطا مواجه شد.",
    };
  }
}

// function parsePublishDate(value) {
//   if (
//     typeof value !== "string" ||
//     !/^\d{4}-\d{2}-\d{2}$/.test(value)
//   ) {
//     throw new Error("تاریخ انتشار معتبر نیست.");
//   }

//   const date = new Date(`${value}T00:00:00.000Z`);

//   // بررسی اینکه تاریخ واقعاً وجود داشته باشد.
//   if (
//     Number.isNaN(date.getTime()) ||
//     date.toISOString().slice(0, 10) !== value
//   ) {
//     throw new Error("تاریخ انتشار معتبر نیست.");
//   }

//   return date;
// }
function parsePublishDate(value) {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    throw new Error("تاریخ انتشار معتبر نیست.");
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
  ) {
    throw new Error("تاریخ انتشار معتبر نیست.");
  }

  return date;
}