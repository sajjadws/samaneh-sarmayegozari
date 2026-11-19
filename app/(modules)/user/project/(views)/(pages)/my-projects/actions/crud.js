"use server";

import prismaDB from "@/lib/prisma/prismaDB";
import { auth } from "@/lib/authentication/auth";
import * as jalaali from "jalaali-js";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";



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

// دریافت کاربران برای Combobox
export async function getTeamUsers() {
  try {
    const users = await prismaDB.user.findMany({
      where: {
        name: {
          not: null,
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      ok: true,
      data: users,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message || "خطا در دریافت کاربران",
    };
  }
}

// دریافت اعضای تیم پروژه
export async function getProjectTeam(projectId) {
  try {
    const userId = await getCurrentUser();

    const project = await checkProjectOwner(projectId, userId);

    if (!project) {
      throw new Error("پروژه پیدا نشد.");
    }

    const members = await prismaDB.teamProject.findMany({
      where: {
        projectId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      ok: true,
      data: members,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message || "خطا در دریافت اعضای تیم",
    };
  }
}

// ایجاد عضو جدید
export async function createProjectTeam(projectId, values) {
  try {
    const currentUserId = await getCurrentUser();

    const project = await checkProjectOwner(
      projectId,
      currentUserId
    );

    if (!project) {
      throw new Error("پروژه پیدا نشد.");
    }

    const selectedUser = await prismaDB.user.findUnique({
      where: {
        id: values.userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!selectedUser) {
      throw new Error("کاربر انتخاب‌شده پیدا نشد.");
    }

    const member = await prismaDB.teamProject.create({
      data: {
        userId: selectedUser.id,
        name: selectedUser.name || "",
        position: values.position,
        expertise: values.expertise,
        description: values.description || "",
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

// ویرایش عضو تیم
export async function updateProjectTeam(id, values) {
  try {
    const currentUserId = await getCurrentUser();

    const member = await prismaDB.teamProject.findFirst({
      where: {
        id,
        project: {
          usrId: currentUserId,
        },
      },
    });

    if (!member) {
      throw new Error("عضو تیم پیدا نشد.");
    }

    const selectedUser = await prismaDB.user.findUnique({
      where: {
        id: values.userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!selectedUser) {
      throw new Error("کاربر انتخاب‌شده پیدا نشد.");
    }

    const updated = await prismaDB.teamProject.update({
      where: {
        id,
      },
      data: {
        userId: selectedUser.id,
        name: selectedUser.name || "",
        position: values.position,
        expertise: values.expertise,
        description: values.description || "",
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

// حذف عضو تیم
export async function deleteProjectTeam(id) {
  try {
    const currentUserId = await getCurrentUser();

    const member = await prismaDB.teamProject.findFirst({
      where: {
        id,
        project: {
          usrId: currentUserId,
        },
      },
    });

    if (!member) {
      throw new Error("عضو تیم پیدا نشد.");
    }

    await prismaDB.teamProject.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      message: "عضو تیم با موفقیت حذف شد.",
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
