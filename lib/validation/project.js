import * as z from "zod";

export const projectSchema = z.object({
	title: z.string({ error: "فیلد خالی است" }).min(3, "نام پروژه باید حداقل 3 حرف باشد."),
	description: z.string({ error: "فیلد خالی است" }).min(15, "توضیحات پروژه باید حداقل 15 حرف باشد.").max(250, "توضیحات پروژه باید حداکثر 250 حرف باشد."),
	credit: z.coerce.number({ error: "فیلد خالی است" }).min(100, "حداقل اعتبار پروژه باید 100 تومان باشد."),
	executionDuration: z.coerce.number({ error: "فیلد خالی است" }).min(1, "حداقل زمان پروژه باید 1 ماه باشد."),
	enable: z.boolean({
		error: "وضعیت فعال بودن پروژه باید یک مقدار بولی باشد.",
	}),
	projectStatus: z.string(),
	categoryId: z.int(),
	date: z.date({ error: "لطفاً تاریخ را انتخاب کنید" }).refine(
		(date) => {
			const selectedDate = new Date(date);
			const today = new Date();
			selectedDate.setHours(0, 0, 0, 0);
			today.setHours(0, 0, 0, 0);
			return selectedDate >= today;
		},
		{ error: "تاریخ نمی‌تواند در گذشته باشد" },
	),
	// projectStatus: z.enum([0, 1, 2], {
	// 	error: "نقش کاربر را انتخاب کنید.",
	// }),
	// projectStatus: z.enum(['PENDING','APPROVED','REJECTED'], {
	// 	error: "نقش کاربر را انتخاب کنید.",
	// }),
});
