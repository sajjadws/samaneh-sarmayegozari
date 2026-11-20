import { z } from "zod";

export const accountNumberSchema = z
    .string()
    .transform((value) => value.replace(/\s+/g, ""))
    .refine((value) => /^\d{16}$/.test(value), {
        message: "شماره حساب باید ۱۶ رقم باشد",
    });

export const formatCardNumber = (value = "") => {
    return String(value).replace(/(\d{4})(?=\d)/g, "$1 ");
};