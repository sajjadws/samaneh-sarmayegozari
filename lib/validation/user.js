import * as z from "zod";

export const userSchema = z.object({
  fullName: z.string().optional().nullable(),
  phoneNumber: z
    .string()
    .trim()
    .startsWith("+989", "شماره تماس صحیح نمیباشد و باید با +998 شروع شود.")
    .min(13, "شماره تماس باید 13 رقم باشد")
    .max(13, "شماره تماس باید 13 رقم باشد"),
    role: z.enum(["ADMIN", "USER"], {
      error: "نقش کاربر را انتخاب کنید.",
    }),
});