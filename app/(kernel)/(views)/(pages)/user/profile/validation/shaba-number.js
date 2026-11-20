import { z } from "zod";

export const shebaSchema = z
	.string()
	.transform((value) => value.replace(/\s+/g, "").toUpperCase())
	.refine((value) => /^IR\d{24}$/.test(value), {
		message: "شماره شبا باید با IR شروع شده و ۲۴ رقم داشته باشد",
	});

export const formatSheba = (value = "") => {
	return String(value).replace(/(.{4})(?=.)/g, "$1 ");
};
