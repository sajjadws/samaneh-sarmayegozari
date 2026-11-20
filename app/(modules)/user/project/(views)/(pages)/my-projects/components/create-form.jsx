"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/lib/validation/project";

import { Separator } from "@/miz/themes/react/components/separator/page";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/miz/components/react/field/page";
import { Input } from "@/miz/components/react/input/page";
import { Button } from "@/miz/themes/react/components/button/page";

const steps = ["اطلاعات اصلی طرح", "اطلاعات فنی", "تیم مجری", "اسناد و تصاویر"];

export default function CreateForm({ formData, updateField, nextStep }) {
	const form = useForm({
		resolver: zodResolver(postSchema),

		defaultValues: {
			title: formData?.title || "پنل",
			description: formData?.description || "پنل اننذندنتدنت",
			durationDate: formData?.durationDate || "3",
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	const onSubmit = async (values) => {
		await nextStep(values);
	};

	return (
		<div className="d-flex flex-column gap-7 w-100">
				<h2 className="txt-size-mid-titile font-weight-bold">ایجاد طرح سرمایه گذاری جدید</h2>
				<div className="documents-steps d-flex align-items-center w-100">
					{steps.map((step, index) => (
						<div className="d-flex align-items-center grow-1 w-sm-100" key={step}>
							<div
								className={`documents-step ${
									index === 0 ? "active" : "pending"
								}`}
							>
								{step}
							</div>

							{index !== steps.length - 1 && (
								<div className="documents-step-arrow position-relative d-md-none">
									<span></span>
								</div>
							)}
						</div>
					))}
				</div>

			<div className="px-8 bg-card-color radius-all-normal px-6 py-6">
				<div className="mb-6">
					<h2 className="text-xl font-bold">ایجاد طرح سرمایه گذاری جدید</h2>

					<p className="mt-2 text-sm">اطلاعات کلی طرح سرمایه گذاری خود را وارد کنید.</p>

					<Separator />
				</div>

				<form id="form-rhf-input" onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup>
						<Field>
							<FieldLabel>عنوان طرح</FieldLabel>

							<Input {...register("title")} placeholder="عنوان طرح را وارد کنید" />

							{errors.title && <FieldError>{errors.title.message}</FieldError>}
						</Field>

						<Field>
							<FieldLabel>توضیحات کامل</FieldLabel>

							<textarea
								{...register("description")}
								placeholder="توضیحات طرح را وارد کنید"
								rows={5}
								className="w-full rounded-md border p-3"
							/>

							{errors.description && <FieldError>{errors.description.message}</FieldError>}
						</Field>

						<Field>
							<FieldLabel>مدت زمان اجرای طرح (ماه)</FieldLabel>

							<Input
								{...register("durationDate")}
								type="number"
								min="1"
								max="600"
								step="1"
								placeholder="مثلاً 18"
							/>

							{errors.durationDate && <FieldError>{errors.durationDate.message}</FieldError>}
						</Field>
					</FieldGroup>

					<div className="project-modal-footer mt-6">
						<Button type="submit">مرحله بعد ←</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
