"use server";

import prismaDB from "@/lib/prisma/prismaDB";
import { phoneNumberSchema, verifyCodeSchema } from "@/lib/validation/auth";
import { auth } from "@/lib/authentication/auth";

export const sendVerifyCode = async (values) => {
	try {
		const validateData = phoneNumberSchema.safeParse(values);

		if (!validateData.success) {
			return {
				ok: false,
				status: 400,
				message: "فرمت دیتای ارسالی صحیح نمیباشد",
				errors: validateData.error.flatten().fieldErrors,
			};
		}

		const { phoneNumber, fullName } = values;

		// const user = await prismaDB.user.upsert({
		// 	where: {
		// 		phoneNumber,
		// 	},
		// 	create: { id: crypto.randomUUID(), phoneNumber, fullName },
		// 	update: {},
		// });
		const user = await prismaDB.user.upsert({
			where: {
				phoneNumber,
			},
			create: {
				id: crypto.randomUUID(),
				phoneNumber,
			},
			update: {}
		});

		const data = await auth.api.sendPhoneNumberOTP({
			body: {
				phoneNumber: phoneNumber,
			},
		});

		var smsRes = {
			ok: false,
		};

		smsRes = {
			message: "کد تایید برای شما ارسال شد",
			status: 200,
			data: {
				...values,
			},
			ok: true,
		};

		return smsRes;
	} catch (error) {
		console.log("[SEND_VERIFY_CODE_ERROR]", error);

		return {
			massage: JSON.stringify({
				message: "Internal error",
				error: error.massage,
			}),
			status: 500,
			ok: false,
		};
	}
};

export const checkVerifyCode = async (values) => {
	const validateData = verifyCodeSchema.safeParse(values);

	if (!validateData.success) {
		return {
			ok: false,
			status: 400,
			message: "فرمت کد ارسالی صحیح نمی‌باشد",
			errors: validateData.error.flatten().fieldErrors,
		};
	}

	try {
		const userData = await auth.api.verifyPhoneNumber({
			body: {
				phoneNumber: values?.phoneNumber,
				code: values?.code,
				disableSession: false,
				updatePhoneNumber: false,
			},
		});

		return {
			ok: true,
			status: 200,
			message: "خوش آمدید",
			data: userData,
		};
	} catch (error) {
		console.error("[VERIFY_PHONE_ERROR]", error);

		return {
			ok: false,
			status: 400,
			message: "تأیید شماره تلفن ناموفق بود.",
		};
	}
};
