"use server";

// import prismadb from "@/lib/prisma/prismaDB";
import { routes } from "@/lib/routes/routes";
import { postSchema } from "@/lib/validation/project";
import { revalidatePath } from "next/cache";
// import { getCurrentUser } from "@/lib/get-current-user";
// import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { randomUUID } from "node:crypto";


export const getAllPosts = async (options = {}) => {
  const page = options?.page || 1;
  const perPage = options?.perPage || 10;
  //تعداد رکوردی که باید بره جلوتر
  const skip = (page - 1) * perPage;
  //تعداد رکوردی که از تیبل میخواهیم
  const take = perPage;
  const role = options?.role;

  // console.log("roleeeeeeeeeeeeeeeeeee", role);

  const searchString = options.q;

  const searchFilter = {
    AND: [
      {
        OR: [
          { title: { contains: searchString} },
          { description: { contains: searchString} },
        ],
      },
    ],
  };

  console.log("searchFilter", searchFilter);

  const where = searchFilter;

  const total = await prismadb.post.count({ where });

  const data = await prismadb.post.findMany({
    where,
    skip,
    take,
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      publishDate: true,
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
    },
    message: "داده ها ارسال شدند",
  };
};

export const getPostById = async (id) => {
  try {
    console.log("شناسه دریافتی:", id);

    const data = await prismadb.post.findUnique({
      where: {
        id: String(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        publishDate: true,
        categoryId: true,
      },
    });

    console.log("پست پیدا شده:", data);

    if (!data) {
      return {
        ok: false,
        data: null,
        message: "پست موردنظر پیدا نشد.",
      };
    }

    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error("خطای دریافت پست:", error);

    return {
      ok: false,
      data: null,
      message: "دریافت پست ناموفق بود.",
    };
  }
};



// export const createPost = async (values) => {
//   const validateData = postSchema.safeParse(values);
//   const publishDate = parsePublishDate(values.publishDate);

//   if (!validateData.success) {
//     return {
//       ok: false,
//       status: 400,
//       message: "فرمت دیتای ارسالی صحیح نمیباشد",
//       errors: validateData.error.flatten().fieldErrors,
//     };
//   }


//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) {
//     return {
//       ok: false,
//       message: "برای ثبت پست ابتدا وارد حساب کاربری شوید.",
//     };
//   }
  
// const post = await prismadb.post.create({
  
//   data: {
//     id: randomUUID(),
//     title: values.title,
//     description: values.description,
//     publishDate,

//     user: {
//       connect: {
//         id: session.user.id,
//       },
//     },

//     category: {
//       connect: {
//         id: values.categoryId,
//       },
//     },
//   },

//   include: {
//     user: true,
//     category: true,
//   },
// });
//   revalidatePath("/posts");

//   return {
//     ok: true,
//     status: 201,
//     post,
//     message: "پروژه جدید اضافه شد",
//   };
// };
export const createPost = async (values) => {
  try {
    // 1. اعتبارسنجی اطلاعات فرم
    const validateData = postSchema.safeParse(values);

    if (!validateData.success) {
      console.error(
        "خطای اعتبارسنجی:",
        validateData.error.flatten().fieldErrors
      );

      return {
        ok: false,
        status: 400,
        message: "اطلاعات واردشده معتبر نیست.",
        errors: validateData.error.flatten().fieldErrors,
      };
    }

    // 2. تبدیل تاریخ به Date معتبر
    const publishDate = parsePublishDate(
      validateData.data.publishDate
    );

    console.log("شروع ثبت پست");

    // 3. بررسی ورود کاربر
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        ok: false,
        status: 401,
        message: "برای ثبت پست ابتدا وارد حساب کاربری شوید.",
      };
    }


console.log("وضعیت Session هنگام ثبت پست:", !!session);
console.log("شناسه کاربر:", session?.user?.id);

    // 4. ذخیره پست در دیتابیس
    const post = await prismadb.post.create({
      data: {
        id: randomUUID(),
        title: validateData.data.title,
        description: validateData.data.description,
        publishDate,

        user: {
          connect: {
            id: session.user.id,
          },
        },

        category: {
          connect: {
            id: validateData.data.categoryId,
          },
        },
      },
      include: {
        user: true,
        category: true,
      },
    });

    // 5. به‌روزرسانی مسیر
    revalidatePath("/posts");

    return {
      ok: true,
      status: 201,
      post,
      message: "پست با موفقیت ثبت شد.",
    };
  } catch (error) {
    // نمایش علت واقعی خطا در ترمینال سرور
    console.error("خطای واقعی در createPost:", error);

    return {
      ok: false,
      status: 500,
      message: "ذخیره پست با خطا مواجه شد.",
    };
  }
};


// export const editPost = async (id, values) => {
//   const validateData = postSchema.safeParse(values);
//   const publishDate = parsePublishDate(values.publishDate);

//   if (!validateData.success) {
//     return {
//       ok: false,
//       status: 400,
//       message: "فرمت دیتای ارسالی صحیح نمیباشد",
//       errors: validateData.error.flatten().fieldErrors,
//     };
//   }

//   const data = await prismadb.post.update({
//     where: { id },
//     data: { ...values },
//     publishDate,
//   });

//   revalidatePath(routes.panel.posts);

//   return {
//     ok: true,
//     status: 201,
//     data,
//     message: "کاربر مورد نظر ویرایش شد",
//   };
// };
export const editPost = async (id, values) => {
  try {
    // مرحله اول: اعتبارسنجی
    const validateData = postSchema.safeParse(values);

    if (!validateData.success) {
      return {
        ok: false,
        status: 400,
        message: "اطلاعات واردشده معتبر نیست.",
        errors: validateData.error.flatten().fieldErrors,
      };
    }

    const validValues = validateData.data;

    // مرحله دوم: تبدیل تاریخ
    let publishDate;

    try {
      publishDate = parsePublishDate(validValues.publishDate);
    } catch {
      return {
        ok: false,
        status: 400,
        message: "تاریخ انتشار معتبر نیست.",
      };
    }

    // مرحله سوم: بررسی ورود کاربر
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        ok: false,
        status: 401,
        message: "برای ویرایش پست ابتدا وارد حساب کاربری شوید.",
      };
    }

    // مرحله چهارم: دریافت پست و بررسی مالکیت
    const existingPost = await prismadb.post.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!existingPost) {
      return {
        ok: false,
        status: 404,
        message: "پست موردنظر پیدا نشد.",
      };
    }

    // فقط مالک پست یا مدیر مجاز باید بتواند آن را ویرایش کند.
    // این شرط را با ساختار نقش‌های واقعی پروژه تطبیق دهید.
    if (existingPost.userId !== session.user.id) {
      return {
        ok: false,
        status: 403,
        message: "اجازه ویرایش این پست را ندارید.",
      };
    }

    // مرحله پنجم: ویرایش پست
    const data = await prismadb.post.update({
      where: { id },
      data: {
        title: validValues.title,
        description: validValues.description ?? "",
        publishDate,

        category: {
          connect: {
            id: validValues.categoryId,
          },
        },
      },
      include: {
        category: true,
      },
    });

    revalidatePath("/posts");
    revalidatePath(routes.panel.posts);

    return {
      ok: true,
      status: 200,
      data,
      message: "پست با موفقیت ویرایش شد.",
    };
  } catch (error) {
    console.error("خطا در ویرایش پست:", error);

    return {
      ok: false,
      status: 500,
      message: "ویرایش پست با خطا مواجه شد.",
    };
  }
};


export const deletePost = async (id) => {
  if (!id) {
    return {
      ok: false,
      status: 400,
      message: "id مورد نظر وجود ندارد",
    };
  }

  const data = await prismadb.post.delete({
    where: { id },
  });

  revalidatePath(routes.panel.posts);

  return {
    ok: true,
    status: 200,
    data,
    message: "کاربر مورد نظر حذف شد",
  };
};

export const getApprovedPosts = async () => {
  const posts = await prismadb.post.findMany({
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

export async function getApprovedPostsTable() {
  try {
    const posts = await prismadb.post.findMany({
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
      data: posts.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        status: post.status,
        categoryTitle: post.category.title,
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