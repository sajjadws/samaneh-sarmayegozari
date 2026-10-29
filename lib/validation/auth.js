import * as z from "zod";

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .startsWith("+989", "شماره تماس صحیح نمیباشد و باید با +998 شروع شود.")
    .min(13, "شماره تماس باید 13 رقم باشد")
    .max(13, "شماره تماس باید 13 رقم باشد"),
});

export const verifyCodeSchema = z.object({
  code: z.string().min(6, "کد تایید 6 رقم میباشد").max(6, "کد تایید 6 رقم میباشد"),
});
