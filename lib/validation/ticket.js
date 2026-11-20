// import { z } from "zod";
import * as z from "zod";


export const ticketSchema = z.object({
  title: z
    .string()
    .min(3, "عنوان تیکت باید حداقل سه کاراکتر داشته باشد ")
    .max(50, "عنوان نباید بیشتر از 50 کاراکتر باشد"),

  description: z
    .string()
    .min(10, "توضیحات تیکت باید حداقل 10 کاراکتر داشته باشد ")
    .max(1000, "توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),
});