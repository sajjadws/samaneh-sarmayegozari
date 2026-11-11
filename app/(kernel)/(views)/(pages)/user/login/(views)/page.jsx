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
						<div className="d-flex flex-column align-items-center justify-content-center gap-5 p-5">
							<h1 className="txt-size-big-title primary-color">احراز هویت</h1>
							{/* <p className="txt-size-normal mb-1 primary-color">برای ادامه فرآیند سرمایه گذاری، اطلاعات هویتی خود را وارد کنید.</p>
                            <p className="txt-size-normal primary-color">برای ادامه فرآیند سرمایه گذاری، اطلاعات هویتی خود را وارد کنید.</p> */}
							{/* <form className="w-100" id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
								<FieldGroup>
									<Controller
										name="phoneNumber"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="form-rhf-input-phoneNumber">شماره تماس</FieldLabel>
												<Input {...field} id="form-rhf-input-phoneNumber" type="text" maxLength={13} aria-invalid={fieldState.invalid} placeholder="شماره تماس" dir="ltr" />
												{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
											</Field>
										)}
									/>
									<Button type="submit">test</Button>
								</FieldGroup>
							</form> */}
							{step === 1 ? <PhoneNumber userData={userData} handleChangeStep={handleChangeStep} /> : <VerifyCode userData={userData} handleChangeStep={handleChangeStep} />}
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

// "use client";

// import { useState } from "react";
// import PhoneNumber from "./components/phone-number";
// import VerifyCode from "./components/verify-code";

// export default function Login() {
// 	const [userData, setUserData] = useState({
// 		phoneNumber: "",
// 		code: "",
// 		// token: "",
// 	});
// 	const [step, setStep] = useState(1);

// 	const handleChangeStep = (step = 1, values = {}) => {
// 		setUserData((prev) => ({ ...prev, ...values }));
// 		setStep(step);
// 	};

// 	return (
// 		<main className="login-page" dir="rtl">
// 			<div className="login-card">
// 				{/* بخش معرفی سامانه */}
// 				<section className="login-intro">
// 					<div className="intro-content">
// 						<div className="brand">
// 							<div className="brand-icon">
// 							</div>

// 							<div>
// 								<h1 className="brand-title">Investly</h1>
// 								<p className="brand-subtitle">سامانه هوشمند سرمایه‌گذاری</p>
// 							</div>
// 						</div>

// 						<div className="intro-message">
// 							<p className="intro-label">آینده مالی شما</p>

// 							<h2 className="intro-title">
// 								یک قدم تا
// 								<br />
// 								شروع سرمایه‌گذاری
// 							</h2>

// 							<p className="intro-description">با حساب کاربری خود وارد شوید و فرصت‌های سرمایه‌گذاری را دنبال کنید.</p>
// 						</div>
// 					</div>

// 					<div className="intro-decoration decoration-one" />
// 					<div className="intro-decoration decoration-two" />

// 					<p className="intro-footer">سرمایه‌گذاری آگاهانه، آینده‌ای روشن‌تر</p>
// 				</section>

// 				{/* بخش فرم ورود */}

// 				<section className="login-form-section">
// 					<div className="form-heading">
// 						<p className="form-label">{step === 1 ? "ورود / ثبت‌نام" : "تأیید شماره همراه"}</p>

// 						<h2 className="form-title">{step === 1 ? "به حساب خود وارد شوید" : "کد تأیید را وارد کنید"}</h2>

// 						<p className="form-description">{step === 1 ? "نام خانوادگی و شماره همراه خود را وارد کنید." : `کد ارسال‌شده به شماره ${userData.phoneNumber} را وارد کنید.`}</p>
// 					</div>

// 					<div className="step-progress" aria-label={`مرحله ${step} از ۲`}>
// 						<div className="progress-track">
// 							<div className="progress-fill" />
// 						</div>

// 						<div className="progress-track">
// 							<div className={`progress-fill ${step === 2 ? "progress-active" : ""}`} />
// 						</div>
// 					</div>

// 					{step === 1 ? <PhoneNumber userData={userData} handleChangeStep={handleChangeStep} /> : <VerifyCode userData={userData} handleChangeStep={handleChangeStep} />}

// 					<div className="security-note">
// 						<span aria-hidden="true">🔒</span>
// 						<span>حفظ امنیت اطلاعات شما اولویت ماست.</span>
// 					</div>
// 				</section>
// 			</div>
// 		</main>
// 	);
// }
