"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/miz/themes/react/components/field/page";
// import { Input } from "@/miz/themes/react/components/input/page";
import z from "zod";
import { Button } from "@/miz/themes/react/components/button/page";
import { sendVerifyCode } from "./actions/authentication";
import { toast } from "sonner";
import PhoneNumber from "./components/phone-number";
import VerifyCode from "./components/verify-code";
import { useState } from "react";
import "@/lib/globals-client";
import AccountInfo from "./components/account-info";

export default function LoginUserPage() {
	const [userData, setUserData] = useState({
		phoneNumber: "",
		code: "",
	});

	const phoneNumberSchema = z.object({
		phoneNumber: z.string().trim().startsWith("+989", "شماره تماس صحیح نمیباشد و باید با +998 شروع شود.").min(13, "شماره تماس باید 13 رقم باشد").max(13, "شماره تماس باید 13 رقم باشد"),
	});

	const [step, setStep] = useState(1);

	const handleChangeStep = (step = 1, values = {}) => {
		setUserData((prev) => ({ ...prev, ...values }));
		setStep(step);
	};

	const form = useForm({
		resolver: zodResolver(phoneNumberSchema),
		defaultValues: {
			phoneNumber: "+989111111111",
		},
		mode: "onChange",
	});

	async function onSubmit(values) {
		const res = await sendVerifyCode(values);

		if (res?.ok) {
			toast.add({
				title: res?.message,
			});
		}

		handleChangeStep(2, res?.data);
	}

	return (
		<section id="sign-in" className="section bg-color p-0">
			<div className="container d-grid grid-2 w-100">
				<div className="block p-5 h-100">
					<div className="card w-100 h-100 bg-color radius-all-large overflow-hidden d-flex flex-column align-items-center justify-content-center gap-4">
						<div className="d-flex flex-column align-items-center justify-content-center gap-5">
							<h1 className="txt-size-big-title primary-color">احراز هویت</h1>
							<p className="txt-size-normal primary-color">برای ادامه فرآیند سرمایه گذاری، اطلاعات هویتی خود را وارد کنید.</p>
						</div>
						<div className="d-flex flex-column align-items-center justify-content-center gap-5 p-5 w-100">
							{
								(() => {
									switch (step) {
										case 1:
											return (
												<PhoneNumber userData={userData} handleChangeStep={handleChangeStep} />
											);
										case 2:
											return (
												<VerifyCode userData={userData} handleChangeStep={handleChangeStep} />
											);
										case 3:
											return (
												<AccountInfo userData={userData} handleChangeStep={handleChangeStep} />
											);
									}
								})()
							}
						</div>
					</div>
				</div>
				<div className="block">
					<img className="w-100 h-100vh object-cover" src={globalThis.getAssets("media/images/Untitled01 1.jpg")} alt="" />
				</div>
			</div>
		</section>
	);
}