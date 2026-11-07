"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/miz/themes/react/components/field/page";
import { Input } from "@/miz/themes/react/components/input/page";
import z from "zod";
import { Button } from "@/miz/themes/react/components/button/page";
import { sendVerifyCode } from "./actions/authentication";
import { toast } from "sonner";

export default function ProjectsPage() {
	const phoneNumberSchema = z.object({
		phoneNumber: z.string().trim().startsWith("+989", "شماره تماس صحیح نمیباشد و باید با +998 شروع شود.").min(13, "شماره تماس باید 13 رقم باشد").max(13, "شماره تماس باید 13 رقم باشد"),
	});

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

		// handleChangeStep(2, res?.data);
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
							<form className="w-100" id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
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
							</form>
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
