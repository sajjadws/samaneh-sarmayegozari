
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
