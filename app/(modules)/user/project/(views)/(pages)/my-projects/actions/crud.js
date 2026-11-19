"use server";

import prismaDB from "@/lib/prisma/prismaDB";
import { routes } from "@/lib/routes/routes";
import { auth } from "@/lib/authentication/auth";
import * as jalaali from "jalaali-js";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// // وضعیت‌های مجاز پروژه مطابق Prisma Schema
// const PROJECT_STATUSES = [
//  " جذب سرمایه",
// "در حال انجام",
// "تکمیل‌شده",
// ];

// // مسیر صفحه پروژه‌ها
// const PROJECTS_PATH = "routes.panel.myProjects";

// // ------------------------------------------
// // 1. دریافت تمام پروژه‌ها
// // ------------------------------------------

// export const getAllProjects = async (options = {}) => {
//   try {
//     const page = Math.max(1, Number(options.page) || 1);
//     const perPage = Math.max(1, Number(options.perPage) || 10);

//     const skip = (page - 1) * perPage;
//     const take = perPage;

//     const searchString = options.q?.trim() || "";

//     // فیلتر جستجو
//     const where = searchString
//       ? {
//           OR: [
//             {
//               title: {
//                 contains: searchString,
//               },
//             },
//             {
//               description: {
//                 contains: searchString,
//               },
//             },
//           ],
//         }
//       : {};

//     // تعداد کل پروژه‌ها
//     const total = await prismaDB.Project.count({
//       where,
//     });

//     // دریافت پروژه‌ها
//     const data = await prismaDB.Project.findMany({
//       where,

//       skip,
//       take,

//       orderBy: {
//         createdAt: "desc",
//       },

//       select: {
//         id: true,
//         title: true,
//         description: true,
//         durationDate: true,
//         status: true,
//         isPublication: true,
//         usrId: true,
//         createdAt: true,
//         updatedAt: true,

//         user: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },

//         phases: {
//           select: {
//             id: true,
//             profitAmount: true,
//             incomeAmount: true,

//             phaseInvestments: {
//               select: {
//                 investment: {
//                   select: {
//                     id: true,
//                     amount: true,
//                     profitAmount: true,
//                     returnAmount: true,
//                     status: true,
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     });

//     return {
//       ok: true,
//       status: 200,

//       data: {
//         data,
//         total,
//         page,
//         perPage,
//         totalPages: Math.ceil(total / perPage),
//       },

//       message: "پروژه‌ها با موفقیت دریافت شدند.",
//     };
//   } catch (error) {
//     console.error("خطا در دریافت پروژه‌ها:", error);

//     return {
//       ok: false,
//       status: 500,
//       data: null,
//       message: "دریافت پروژه‌ها با خطا مواجه شد.",
//     };
//   }
// };

// // ------------------------------------------
// // 2. دریافت یک پروژه با شناسه
// // ------------------------------------------

// export const getProjectById = async (id) => {
//   try {
//     if (!id) {
//       return {
//         ok: false,
//         status: 400,
//         message: "شناسه پروژه ارسال نشده است.",
//       };
//     }

//     const data = await prismaDB.Project.findUnique({
//       where: {
//         id: String(id),
//       },

//       select: {
//         id: true,
//         title: true,
//         description: true,
//         durationDate: true,
//         status: true,
//         isPublication: true,
//         usrId: true,
//         createdAt: true,
//         updatedAt: true,

//         user: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },

//         phases: {
//           orderBy: {
//             createdAt: "desc",
//           },
//         },

//         questionProjects: true,
//       },
//     });

//     if (!data) {
//       return {
//         ok: false,
//         status: 404,
//         data: null,
//         message: "پروژه موردنظر پیدا نشد.",
//       };
//     }

//     return {
//       ok: true,
//       status: 200,
//       data,
//       message: "پروژه با موفقیت دریافت شد.",
//     };
//   } catch (error) {
//     console.error("خطا در دریافت پروژه:", error);

//     return {
//       ok: false,
//       status: 500,
//       data: null,
//       message: "دریافت پروژه ناموفق بود.",
//     };
//   }
// };

// // ------------------------------------------
// // 3. ایجاد پروژه جدید
// // ------------------------------------------

// export const createProject = async (values) => {
//   try {
//     // بررسی ورود کاربر
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (!session?.user?.id) {
//       return {
//         ok: false,
//         status: 401,
//         message: "برای ثبت پروژه ابتدا وارد حساب کاربری شوید.",
//       };
//     }

//     // بررسی اطلاعات فرم
//     const title = values.title?.trim();
//     const description = values.description?.trim();
//     const durationDate = values.durationDate?.trim();

//     if (!title || !description || !durationDate) {
//       return {
//         ok: false,
//         status: 400,
//         message: "عنوان، توضیحات و مدت پروژه الزامی هستند.",
//       };
//     }

//     if (title.length > 50 || description.length > 255) {
//       return {
//         ok: false,
//         status: 400,
//         message: "طول عنوان یا توضیحات بیشتر از حد مجاز است.",
//       };
//     }

//     const status = values.status || "FUNDRAISING";

//     if (!PROJECT_STATUSES.includes(status)) {
//       return {
//         ok: false,
//         status: 400,
//         message: "وضعیت پروژه معتبر نیست.",
//       };
//     }

//     const isPublication = values.isPublication ?? false;

//     if (typeof isPublication !== "boolean") {
//       return {
//         ok: false,
//         status: 400,
//         message: "وضعیت انتشار باید Boolean باشد.",
//       };
//     }

//     // ثبت پروژه
//     const data = await prismaDB.Project.create({
//       data: {
//         title,
//         description,
//         durationDate,

//         status,
//         isPublication,

//         // اتصال پروژه به کاربر واردشده
//         usrId: session.user.id,
//       },

//       select: {
//         id: true,
//         title: true,
//         description: true,
//         durationDate: true,
//         status: true,
//         isPublication: true,
//         usrId: true,
//         createdAt: true,
//       },
//     });

//     revalidatePath("/user/project/my-projects");
//     revalidatePath("/");

//     return {
//       ok: true,
//       status: 201,
//       data,
//       message: "پروژه با موفقیت ثبت شد.",
//     };
//   } catch (error) {
//     console.error("خطا در ایجاد پروژه:", error);

//     return {
//       ok: false,
//       status: 500,
//       message: "ثبت پروژه با خطا مواجه شد.",
//     };
//   }
// };

// // ------------------------------------------
// // 4. ویرایش پروژه
// // ------------------------------------------

// export const editProject = async (id, values) => {
//   try {
//     if (!id) {
//       return {
//         ok: false,
//         status: 400,
//         message: "شناسه پروژه ارسال نشده است.",
//       };
//     }

//     // بررسی ورود کاربر
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (!session?.user?.id) {
//       return {
//         ok: false,
//         status: 401,
//         message: "برای ویرایش پروژه ابتدا وارد حساب کاربری شوید.",
//       };
//     }

//     // پیدا کردن پروژه
//     const existingProject = await prismaDB.Project.findUnique({
//       where: {
//         id: String(id),
//       },

//       select: {
//         id: true,
//         usrId: true,
//       },
//     });

//     if (!existingProject) {
//       return {
//         ok: false,
//         status: 404,
//         message: "پروژه موردنظر پیدا نشد.",
//       };
//     }

//     // بررسی مالکیت پروژه
//     if (existingProject.usrId !== session.user.id) {
//       return {
//         ok: false,
//         status: 403,
//         message: "شما اجازه ویرایش این پروژه را ندارید.",
//       };
//     }

//     // آماده‌سازی اطلاعات ویرایش
//     const updateData = {};

//     if (values.title !== undefined) {
//       const title = values.title.trim();

//       if (!title || title.length > 50) {
//         return {
//           ok: false,
//           status: 400,
//           message: "عنوان پروژه معتبر نیست.",
//         };
//       }

//       updateData.title = title;
//     }

//     if (values.description !== undefined) {
//       const description = values.description.trim();

//       if (!description || description.length > 255) {
//         return {
//           ok: false,
//           status: 400,
//           message: "توضیحات پروژه معتبر نیست.",
//         };
//       }

//       updateData.description = description;
//     }

//     if (values.durationDate !== undefined) {
//       const durationDate = values.durationDate.trim();

//       if (!durationDate) {
//         return {
//           ok: false,
//           status: 400,
//           message: "مدت پروژه الزامی است.",
//         };
//       }

//       updateData.durationDate = durationDate;
//     }

//     if (values.status !== undefined) {
//       if (!PROJECT_STATUSES.includes(values.status)) {
//         return {
//           ok: false,
//           status: 400,
//           message: "وضعیت پروژه معتبر نیست.",
//         };
//       }

//       updateData.status = values.status;
//     }

//     if (values.isPublication !== undefined) {
//       if (typeof values.isPublication !== "boolean") {
//         return {
//           ok: false,
//           status: 400,
//           message: "وضعیت انتشار معتبر نیست.",
//         };
//       }

//       updateData.isPublication = values.isPublication;
//     }

//     if (Object.keys(updateData).length === 0) {
//       return {
//         ok: false,
//         status: 400,
//         message: "اطلاعاتی برای ویرایش ارسال نشده است.",
//       };
//     }

//     // بروزرسانی پروژه
//     const data = await prismaDB.Project.update({
//       where: {
//         id: String(id),
//       },

//       data: updateData,
//     });

//     revalidatePath(PROJECTS_PATH);
//     revalidatePath("/");

//     return {
//       ok: true,
//       status: 200,
//       data,
//       message: "پروژه با موفقیت ویرایش شد.",
//     };
//   } catch (error) {
//     console.error("خطا در ویرایش پروژه:", error);

//     return {
//       ok: false,
//       status: 500,
//       message: "ویرایش پروژه با خطا مواجه شد.",
//     };
//   }
// };

// // ------------------------------------------
// // 5. حذف پروژه
// // ------------------------------------------

// export const deleteProject = async (id) => {
//   try {
//     if (!id) {
//       return {
//         ok: false,
//         status: 400,
//         message: "شناسه پروژه ارسال نشده است.",
//       };
//     }

//     // بررسی ورود کاربر
//     const session = await auth.api.getSession({
//       headers: await headers(),
//     });

//     if (!session?.user?.id) {
//       return {
//         ok: false,
//         status: 401,
//         message: "برای حذف پروژه ابتدا وارد حساب کاربری شوید.",
//       };
//     }

//     // بررسی وجود پروژه و مالکیت آن
//     const existingProject = await prismaDB.Project.findUnique({
//       where: {
//         id: String(id),
//       },

//       select: {
//         id: true,
//         usrId: true,
//       },
//     });

//     if (!existingProject) {
//       return {
//         ok: false,
//         status: 404,
//         message: "پروژه موردنظر پیدا نشد.",
//       };
//     }

//     if (existingProject.usrId !== session.user.id) {
//       return {
//         ok: false,
//         status: 403,
//         message: "شما اجازه حذف این پروژه را ندارید.",
//       };
//     }

//     // حذف پروژه
//     const data = await prismaDB.Project.delete({
//       where: {
//         id: String(id),
//       },
//     });

//     revalidatePath(PROJECTS_PATH);
//     revalidatePath("/");

//     return {
//       ok: true,
//       status: 200,
//       data,
//       message: "پروژه با موفقیت حذف شد.",
//     };
//   } catch (error) {
//     console.error("خطا در حذف پروژه:", error);

//     return {
//       ok: false,
//       status: 500,
//       message: "حذف پروژه با خطا مواجه شد.",
//     };
//   }
// };

// export const getApprovedProject = async () => {
//   const posts = await prismaDB.Project.findMany({
//     where: {
//       status: "APPROVED",
//     },
//     select: {
//       id: true,
//       title: true,
//       description: true,
//     },
//     orderBy: {
//       id: "desc",
//     },
//   });

//   return posts;
// };

// export async function getApprovedProjectTable() {
//   try {
//     const posts = await prismaDB.Project.findMany({
//       where: {
//         status: "APPROVED",
//       },
//       include: {
//         user: true,
//         category: true,
//       },
//       orderBy: {
//         title: "asc",
//       },
//     });

//     return {
//       ok: true,
//       data: posts.map((Project) => ({
//         id: Project.id,
//         title: Project.title,
//         description: Project.description,
//         status: Project.status,
//         categoryTitle: Project.category.title,
//       })),
//     };
//   } catch (error) {
//     console.error("خطا در دریافت پست‌های تأییدشده:", error);

//     return {
//       ok: false,
//       data: [],
//       message: "دریافت پست‌های تأییدشده با خطا مواجه شد.",
//     };
//   }
// }

// function parsePublishDate(value) {
//   if (
//     typeof value !== "string" ||
//     !/^\d{4}-\d{2}-\d{2}$/.test(value)
//   ) {
//     throw new Error("تاریخ انتشار معتبر نیست.");
//   }

//   const date = new Date(`${value}T00:00:00.000Z`);

//   if (
//     Number.isNaN(date.getTime()) ||
//     date.toISOString().slice(0, 10) !== value
//   ) {
//     throw new Error("تاریخ انتشار معتبر نیست.");
//   }

//   return date;
// }

// دریافت کاربر واردشده
async function getCurrentUser() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw new Error("ابتدا وارد حساب کاربری شوید.");
	}

	return session.user.id;
}

// اعتبارسنجی اطلاعات اصلی پروژه
function validateProjectData(values) {
	const title = String(values.title ?? "").trim();
	const description = String(values.description ?? "").trim();
	const durationDate = String(values.durationDate ?? "").trim();

	if (!title || !description || !durationDate) {
		throw new Error("تمام اطلاعات اصلی طرح الزامی هستند.");
	}

	if (title.length > 50) {
		throw new Error("عنوان طرح نباید بیشتر از ۵۰ کاراکتر باشد.");
	}

	if (description.length > 255) {
		throw new Error("توضیحات طرح نباید بیشتر از ۲۵۵ کاراکتر باشد.");
	}

	const duration = Number(durationDate);

	if (!Number.isInteger(duration) || duration < 1 || duration > 600) {
		throw new Error("مدت زمان اجرا باید عددی بین ۱ تا ۶۰۰ ماه باشد.");
	}

	return {
		title,
		description,
		durationDate,
	};
}

// CREATE: ایجاد پروژه جدید
export async function createProject(values) {
	try {
		const userId = await getCurrentUser();

		const data = validateProjectData(values);

		const project = await prismaDB.project.create({
			data: {
				...data,

				usrId: userId,

				status: "DRAFT",
				step: "FIRST",
				isPublication: false,
			},
		});

		revalidatePath("/userdashboard/projects/my-projects");

		return {
			ok: true,
			data: project,
			projectId: project.id,
			message: "طرح با موفقیت ایجاد شد.",
		};
	} catch (error) {
		console.error("Create Project:", error);

		return {
			ok: false,
			message: error.message || "خطا در ایجاد طرح.",
		};
	}
}

// READ: دریافت تمام پروژه‌های کاربر واردشده
export async function getAllProjects() {
	try {
		const userId = await getCurrentUser();

		const projects = await prismaDB.project.findMany({
			where: {
				usrId: userId,
			},

			orderBy: {
				updatedAt: "desc",
			},

			select: {
				id: true,
				title: true,
				description: true,
				durationDate: true,
				status: true,
				isPublication: true,
				step: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return {
			ok: true,
			data: projects,
		};
	} catch (error) {
		console.error("Get Projects:", error);

		return {
			ok: false,
			message: error.message || "خطا در دریافت پروژه‌ها.",
			data: [],
		};
	}
}

// READ: دریافت یک پروژه با شناسه
export async function getProjectById(projectId) {
	try {
		const userId = await getCurrentUser();

		const project = await prismaDB.project.findFirst({
			where: {
				id: projectId,
				usrId: userId,
			},
		});

		if (!project) {
			throw new Error("پروژه پیدا نشد.");
		}

		return {
			ok: true,
			data: project,
		};
	} catch (error) {
		console.error("Get Project:", error);

		return {
			ok: false,
			message: error.message || "خطا در دریافت پروژه.",
		};
	}
}

// UPDATE: ویرایش اطلاعات اصلی پروژه
export async function updateProject(projectId, values) {
	try {
		const userId = await getCurrentUser();

		const data = validateProjectData(values);

		const existingProject = await prismaDB.project.findFirst({
			where: {
				id: projectId,
				usrId: userId,
			},
		});

		if (!existingProject) {
			throw new Error("پروژه پیدا نشد یا دسترسی به آن ندارید.");
		}

		const project = await prismaDB.project.update({
			where: {
				id: projectId,
			},

			data,
		});

		revalidatePath("/userdashboard/projects/my-projects");

		return {
			ok: true,
			data: project,
			message: "اطلاعات طرح با موفقیت ویرایش شد.",
		};
	} catch (error) {
		console.error("Update Project:", error);

		return {
			ok: false,
			message: error.message || "خطا در ویرایش طرح.",
		};
	}
}

// DELETE: حذف پروژه
export async function deleteProject(projectId) {
	try {
		const userId = await getCurrentUser();

		const project = await prismaDB.project.findFirst({
			where: {
				id: projectId,
				usrId: userId,
			},

			select: {
				id: true,
			},
		});

		if (!project) {
			throw new Error("پروژه پیدا نشد یا دسترسی به آن ندارید.");
		}

		await prismaDB.project.delete({
			where: {
				id: projectId,
			},
		});

		revalidatePath("/userdashboard/projects/my-projects");
		revalidatePath("/");

		return {
			ok: true,
			message: "طرح با موفقیت حذف شد.",
		};
	} catch (error) {
		console.error("Delete Project:", error);

		return {
			ok: false,
			message:
				error.code === "P2003"
					? "این پروژه دارای تراکنش وابسته است و امکان حذف آن وجود ندارد."
					: error.message || "خطا در حذف طرح.",
		};
	}
}

// ایجاد یا ذخیره اطلاعات هر مرحله
const STEP_MAP = {
	BASIC_INFO: "FIRST",
	TECHNICAL_DETAILS: "SECOND",
	EXECUTION_TEAM: "THIRD",
	DOCUMENTS: "FOURTH",
};

export async function saveProjectStep({ projectId, completedStep, values = {} }) {
	try {
		const userId = await getCurrentUser();

		if (!projectId) {
			throw new Error("شناسه پروژه معتبر نیست.");
		}

		const step = STEP_MAP[completedStep];

		if (!step) {
			throw new Error("مرحله نامعتبر است.");
		}

		const existingProject = await prismaDB.project.findFirst({
			where: {
				id: projectId,
				usrId: userId,
			},
		});

		if (!existingProject) {
			throw new Error("پروژه موردنظر پیدا نشد.");
		}

		const project = await prismaDB.project.update({
			where: {
				id: projectId,
			},
			data: {
				step,
			},
		});

		revalidatePath("/userdashboard/projects/my-projects");

		return {
			ok: true,
			projectId: project.id,
			step: project.step,
			data: project,
			message: "مرحله پروژه با موفقیت ذخیره شد.",
		};
	} catch (error) {
		console.error("Save Project Step:", error);

		return {
			ok: false,
			message: error.message || "خطا در ذخیره مرحله پروژه.",
		};
	}
}

async function checkProjectOwner(projectId, userId) {
	const project = await prismaDB.project.findFirst({
		where: {
			id: projectId,
			usrId: userId,
		},
		select: {
			id: true,
		},
	});

	if (!project) {
		throw new Error("پروژه موردنظر پیدا نشد یا شما به آن دسترسی ندارید.");
	}

	return project;
}

// تبدیل تاریخ شمسی به Date میلادی

// تبدیل تاریخ شمسی به میلادی برای ذخیره در دیتابیس
function convertJalaliToDate(value) {
	if (!value) {
		throw new Error("تاریخ الزامی است.");
	}

	// تبدیل اعداد فارسی و عربی به انگلیسی
	const normalized = String(value)
		.trim()
		.replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
		.replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit));

	const match = normalized.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);

	if (!match) {
		throw new Error("فرمت تاریخ شمسی معتبر نیست.");
	}

	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);

	if (!jalaali.isValidJalaaliDate(year, month, day)) {
		throw new Error("تاریخ شمسی معتبر نیست.");
	}

	const gregorian = jalaali.toGregorian(year, month, day);

	return new Date(Date.UTC(gregorian.gy, gregorian.gm - 1, gregorian.gd));
}

// اعتبارسنجی و تبدیل اطلاعات فاز

function validatePhaseData(values) {
	const title = String(values.title ?? "").trim();
	const description = String(values.description ?? "").trim();

	const targetAmount = String(values.targetAmount ?? "").trim();
	const expectedRevenue = String(values.expectedRevenue ?? "").trim();
	const expectedProfit = String(values.expectedProfit ?? "").trim();

	if (!title) {
		throw new Error("عنوان فاز الزامی است.");
	}

	if (title.length > 50) {
		throw new Error("عنوان فاز نباید بیشتر از ۵۰ کاراکتر باشد.");
	}

	if (!description) {
		throw new Error("توضیحات فاز الزامی است.");
	}

	if (description.length > 250) {
		throw new Error("توضیحات فاز نباید بیشتر از ۲۵۰ کاراکتر باشد.");
	}

	const amounts = [targetAmount, expectedRevenue, expectedProfit];

	if (amounts.some((amount) => !/^\d+(\.\d+)?$/.test(amount))) {
		throw new Error("مقادیر مالی باید عدد معتبر و غیرمنفی باشند.");
	}

	const startDate = convertJalaliToDate(values.startDate);
	const endDate = convertJalaliToDate(values.endDate);

	if (endDate < startDate) {
		throw new Error("تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد.");
	}

	return {
		title,
		description,
		startDate,
		endDate,
		totalAmount: targetAmount,
		ProjectedRevenue: expectedRevenue,
		profitAmount: expectedProfit,
	};
}

// CREATE: ایجاد فاز جدید
export async function createPhase(projectId, values) {
	try {
		const userId = await getCurrentUser();

		await checkProjectOwner(projectId, userId);

		const data = validatePhaseData(values);

		const phase = await prismaDB.projectPhase.create({
			data: {
				...data,
				projectId,
			},
		});

		revalidatePath("/userdashboard/projects/my-projects");

		return {
			ok: true,
			data: phase,
			message: "فاز جدید با موفقیت ایجاد شد.",
		};
	} catch (error) {
		console.error("createPhase:", error);

		return {
			ok: false,
			message: error.message || "خطا در ایجاد فاز.",
		};
	}
}

// READ: دریافت تمام فازهای یک پروژه
export async function getProjectPhases(projectId) {
	try {
		const userId = await getCurrentUser();

		await checkProjectOwner(projectId, userId);

		const phases = await prismaDB.projectPhase.findMany({
			where: {
				projectId,
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		return {
			ok: true,
			data: phases,
		};
	} catch (error) {
		console.error("getProjectPhases:", error);

		return {
			ok: false,
			message: error.message || "خطا در دریافت فازها.",
		};
	}
}

// UPDATE: ویرایش فاز
export async function updatePhase(projectId, phaseId, values) {
	try {
		const userId = await getCurrentUser();

		await checkProjectOwner(projectId, userId);

		const existingPhase = await prismaDB.projectPhase.findFirst({
			where: {
				id: phaseId,
				projectId,
			},
		});

		if (!existingPhase) {
			throw new Error("فاز موردنظر پیدا نشد.");
		}

		const data = validatePhaseData(values);

		const phase = await prismaDB.projectPhase.update({
			where: {
				id: phaseId,
			},
			data,
		});

		revalidatePath("/userdashboard/projects/my-projects");

		return {
			ok: true,
			data: phase,
			message: "فاز با موفقیت ویرایش شد.",
		};
	} catch (error) {
		console.error("updatePhase:", error);

		return {
			ok: false,
			message: error.message || "خطا در ویرایش فاز.",
		};
	}
}

// DELETE: حذف فاز
export async function deletePhase(projectId, phaseId) {
	try {
		const userId = await getCurrentUser();

		await checkProjectOwner(projectId, userId);

		const existingPhase = await prismaDB.projectPhase.findFirst({
			where: {
				id: phaseId,
				projectId,
			},
		});

		if (!existingPhase) {
			throw new Error("فاز موردنظر پیدا نشد.");
		}

		await prismaDB.projectPhase.delete({
			where: {
				id: phaseId,
			},
		});

		revalidatePath("/userdashboard/projects/my-projects");

		return {
			ok: true,
			message: "فاز با موفقیت حذف شد.",
		};
	} catch (error) {
		console.error("deletePhase:", error);

		return {
			ok: false,
			message: error.message || "خطا در حذف فاز.",
		};
	}
}

export async function createProjectTeam(projectId, values) {
	try {
		const userId = await getCurrentUser();

		const project = await prismaDB.project.findFirst({
			where: {
				id: projectId,
				usrId: userId,
			},
		});

		if (!project) {
			throw new Error("پروژه پیدا نشد.");
		}

		const member = await prismaDB.teamProject.create({
			data: {
				fullName: values.fullName,
				description: values.description || "",
				position: values.position,
				expertise: values.expertise,
				projectId,
			},
		});

		return {
			ok: true,
			data: member,
		};
	} catch (error) {
		return {
			ok: false,
			message: error.message || "خطا در ثبت عضو تیم",
		};
	}
}

export async function updateProjectTeam(id, values) {
	try {
		const userId = await getCurrentUser();

		const member = await prismaDB.teamProject.findFirst({
			where: {
				id,
				project: {
					usrId: userId,
				},
			},
		});

		if (!member) {
			throw new Error("عضو تیم پیدا نشد.");
		}

		const updated = await prismaDB.teamProject.update({
			where: { id },
			data: {
				fullName: values.fullName,
				description: values.description || "",
				position: values.position,
				expertise: values.expertise,
			},
		});

		return {
			ok: true,
			data: updated,
		};
	} catch (error) {
		return {
			ok: false,
			message: error.message || "خطا در ویرایش عضو تیم",
		};
	}
}

export async function deleteProjectTeam(id) {
	try {
		const userId = await getCurrentUser();

		const member = await prismaDB.teamProject.findFirst({
			where: {
				id,
				project: {
					usrId: userId,
				},
			},
		});

		if (!member) {
			throw new Error("عضو تیم پیدا نشد.");
		}

		await prismaDB.teamProject.delete({
			where: { id },
		});

		return {
			ok: true,
			message: "عضو تیم حذف شد.",
		};
	} catch (error) {
		return {
			ok: false,
			message: error.message || "خطا در حذف عضو تیم",
		};
	}
}

export async function getIncompleteProjects() {
	try {
		const userId = await getCurrentUser();

		const projects = await prismaDB.project.findMany({
			where: {
				usrId: userId,
				status: "DRAFT",
			},
			orderBy: {
				updatedAt: "desc",
			},
			select: {
				id: true,
				title: true,
				description: true,
				durationDate: true,
				step: true,
				status: true,
				updatedAt: true,
			},
		});

		return {
			ok: true,
			data: projects,
		};
	} catch (error) {
		console.error("Get Incomplete Projects:", error);

		return {
			ok: false,
			message: error.message,
			data: [],
		};
	}
}

export async function getProjectWizard(projectId) {
	try {
		const userId = await getCurrentUser();

		const project = await prismaDB.project.findFirst({
			where: {
				id: projectId,
				usrId: userId,
			},
			include: {
				phases: true,

				// رابطه صحیح اعضای تیم
				teamProjectProjects: {
					include: {
						teamproject: {
							include: {
								user: true,
							},
						},
					},
				},

				fileProjects: true,
			},
		});

		if (!project) {
			return {
				ok: false,
				message: "پروژه موردنظر پیدا نشد.",
			};
		}

		return {
			ok: true,
			data: project,
		};
	} catch (error) {
		console.error("getProjectWizard error:", error);

		return {
			ok: false,
			message: error.message || "خطا در دریافت اطلاعات پروژه.",
		};
	}
}

export async function completeProject(projectId) {
	try {
		const userId = await getCurrentUser();

		const project = await prismaDB.project.findFirst({
			where: {
				id: projectId,
				usrId: userId,
			},
			include: {
				phases: true,
			},
		});

		if (!project) {
			throw new Error("پروژه پیدا نشد.");
		}

		if (!project.title || !project.description || !project.phases.length) {
			throw new Error("اطلاعات ضروری پروژه تکمیل نشده است.");
		}

		const result = await prismaDB.project.update({
			where: {
				id: projectId,
			},
			data: {
				step: "COMPLETED",
				status: "FUNDRAISING",
				isPublication: false,
			},
		});

		revalidatePath("/userdashboard/projects/my-projects");
		revalidatePath("/");

		return {
			ok: true,
			data: result,
			message: "طرح با موفقیت ثبت شد.",
		};
	} catch (error) {
		console.error("Complete Project:", error);

		return {
			ok: false,
			message: error.message || "ثبت نهایی طرح با خطا مواجه شد.",
		};
	}
}
