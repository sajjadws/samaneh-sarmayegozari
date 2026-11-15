
import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "عنوان طرح باید حداقل ۳ کاراکتر باشد.")
    .max(50, "عنوان طرح نباید بیشتر از ۵۰ کاراکتر باشد."),

  description: z
    .string()
    .trim()
    .min(10, "توضیحات طرح باید حداقل ۱۰ کاراکتر باشد.")
    .max(255, "توضیحات نباید بیشتر از ۲۵۵ کاراکتر باشد."),

  durationDate: z
    .string()
    .trim()
    .min(1, "مدت زمان اجرای طرح را وارد کنید.")
    .regex(/^\d+$/, "مدت زمان باید عدد باشد.")
    .refine(
      (value) => Number(value) >= 1 && Number(value) <= 600,
      "مدت زمان باید بین ۱ تا ۶۰۰ ماه باشد."
    ),
});


const normalizeDate = (value) => {
  if (!value) return null;

  const normalized = String(value)
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/-/g, "/");

  const parts = normalized.split("/");

  if (parts.length < 3) return null;

  const [year, month, day] = parts.map(Number);

  if (
    !year ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  return year * 10000 + month * 100 + day;
};



export const phaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "عنوان فاز حداقل باید ۳ کاراکتر باشد.")
    .max(100, "عنوان فاز حداکثر ۱۰۰ کاراکتر باشد."),

  description: z
    .string()
    .trim()
    .min(10, "توضیحات فاز حداقل باید ۱۰ کاراکتر باشد."),

  startDate: z.string().min(1, "تاریخ شروع را انتخاب کنید."),

  endDate: z.string().min(1, "تاریخ پایان را انتخاب کنید."),

  targetAmount: z.string().min(1, "مبلغ هدف را وارد کنید."),

  expectedRevenue: z.string().min(1, "درآمد پیش‌بینی شده را وارد کنید."),

  expectedProfit: z.string().min(1, "سود پیش‌بینی شده را وارد کنید."),

}).superRefine((data, ctx) => {
  const start = normalizeDate(data.startDate);
  const end = normalizeDate(data.endDate);

  if (start === null || end === null) {
    ctx.addIssue({
      code: "custom",
      message: "فرمت تاریخ معتبر نیست.",
      path: ["startDate"],
    });

    return;
  }

  if (end <= start) {
    ctx.addIssue({
      code: "custom",
      message: "تاریخ پایان باید بعد از تاریخ شروع باشد.",
      path: ["endDate"],
    });
  }
});

