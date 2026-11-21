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
		<div className="scroll-form overflow-hidden width-modal">
			<div className="d-flex flex-column gap-7 w-100 overflow-y-scroll">
				<h2 className="txt-size-mid-titile font-weight-bold">ایجاد طرح سرمایه گذاری جدید</h2>
				<div className="documents-steps d-flex align-items-center justify-content-space-between w-100">
					{steps.map((step, index) => (
						<div className="d-flex align-items-center w-fit-content w-sm-100" key={step}>

							<div key={step} className={`documents-step ${index === 0 ? "active" : "pending"}`}>{step}</div>
							{index !== steps.length - 1 && (
								<div className="documents-step-arrow position-relative d-md-none">
									<span></span>
								</div>
							)}
              
						</div>
					))}
				</div>

				<div className="bg-card-color radius-all-normal px-6 py-6 shadow-light">
					<div className="d-flex flex-column gap-1">
						<h2 className="txt-size-title font-weight-bold">اطلاعات اصلی طرح</h2>
						<p className="txt-size-normal text-color font-weight-medium mb-2">اطلاعات کلی طرح سرمایه گذاری خود را وارد کنید.</p>
						<Separator />
					</div>

					<form id="form-rhf-input" className="py-4 d-flex flex-column gap-6" onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup className="d-flex flex-column gap-6">

							<Field className="d-flex flex-column gap-2">
								<FieldLabel className="txt-size-title font-weight-bold">عنوان طرح</FieldLabel>
								<Input {...register("title")} placeholder="عنوان طرح را وارد کنید" />
								{errors.title && <FieldError className="danger-regular-color">{errors.title.message}</FieldError>}
							</Field>

							<Field className="d-flex flex-column gap-2">
								<FieldLabel className="txt-size-title font-weight-bold ">توضیحات کامل</FieldLabel>
								<textarea
									{...register("description")}
									placeholder="توضیحات طرح را وارد کنید"
									rows={5}
									className="height-description radius-all-small"
								/>
								{errors.description && <FieldError className="danger-regular-color">{errors.description.message}</FieldError>}
							</Field>

							<Field className="d-flex flex-column gap-2">
								<FieldLabel className="txt-size-title font-weight-bold">مدت زمان اجرای طرح (ماه)</FieldLabel>
								<Input
									{...register("durationDate")}
									type="number"
									min="1"
									max="600"
									step="1"
									placeholder="مثلاً 18"
								/>

								{errors.durationDate && <FieldError className="danger-regular-color">{errors.durationDate.message}</FieldError>}
							</Field>
						</FieldGroup>

						<div className="">
							<Button type="submit" variant="default" className="position-relative button-next-footer ">مرحله بعد ←</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
