import * as z from "zod";

export const categorySchema = z.object({
	title: z.string({error: "فیلد خالی است"}).min(3, "نام پروژه باید حداقل 3 حرف باشد."),
	description: z.string({error: "فیلد خالی است"}).min(15, "توضیحات پروژه باید حداقل 15 حرف باشد.").max(250, "توضیحات پروژه باید حداکثر 250 حرف باشد."),
});