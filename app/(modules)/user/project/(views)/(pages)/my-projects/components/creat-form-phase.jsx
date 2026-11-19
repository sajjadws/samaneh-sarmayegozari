"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/miz/components/react/field/page";

import { Input } from "@/miz/components/react/input/page";
import PersianDatePicker from "@/miz/themes/react/components/persian-date-picker/page";

import { phaseSchema } from "@/lib/validation/project";

export default function CreateFormPhase({ initialData, onSave, onCancel }) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(phaseSchema),
		defaultValues: {
			title: initialData?.title ?? "طراحی",
			description: initialData?.description ?? "طرایحنانذنت",
			startDate: initialData?.startDate ?? "1405/1/2",
			endDate: initialData?.endDate ?? "1405/12/2",
			targetAmount: initialData?.targetAmount ?? "4000",
			expectedRevenue: initialData?.expectedRevenue ?? "400",
			expectedProfit: initialData?.expectedProfit ?? "40",
		},
	});

	const onSubmit = async (values) => {
		try {
			await onSave?.(values);
		} catch (error) {
			console.error("خطا در ذخیره فاز:", error);
		}
	};

	return (
		<div className="px-6 py-6 bg-card-color radius-all-normal">
			<div className="mb-6">
				<h2 className="text-xl font-bold">{initialData ? "ویرایش فاز" : "افزودن فاز جدید"}</h2>

				<p className="mt-2 text-sm">اطلاعات مربوط به فاز جدید را وارد کنید.</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<FieldGroup>
					<Field>
						<FieldLabel>عنوان فاز</FieldLabel>
						<Input {...register("title")} />
						{errors.title && <FieldError>{errors.title.message}</FieldError>}
					</Field>

					<Field>
						<FieldLabel>توضیحات</FieldLabel>
						<textarea {...register("description")} rows={4} className="w-full rounded-md border p-3" />
						{errors.description && <FieldError>{errors.description.message}</FieldError>}
					</Field>

					<div className="d-flex gap-3">
						<Field>
							<FieldLabel>تاریخ شروع</FieldLabel>

							<Controller
								name="startDate"
								control={control}
								render={({ field }) => (
									<PersianDatePicker value={field.value} onChange={field.onChange} />
								)}
							/>

							{errors.startDate && <FieldError>{errors.startDate.message}</FieldError>}
						</Field>

						<Field>
							<FieldLabel>تاریخ پایان</FieldLabel>

							<Controller
								name="endDate"
								control={control}
								render={({ field }) => (
									<PersianDatePicker value={field.value} onChange={field.onChange} />
								)}
							/>

							{errors.endDate && <FieldError>{errors.endDate.message}</FieldError>}
						</Field>
					</div>

					<Field>
						<FieldLabel>مبلغ هدف (تومان)</FieldLabel>
						<Input type="number" {...register("targetAmount")} />
						{errors.targetAmount && <FieldError>{errors.targetAmount.message}</FieldError>}
					</Field>

					<Field>
						<FieldLabel>درآمد پیش‌بینی شده (تومان)</FieldLabel>
						<Input type="number" {...register("expectedRevenue")} />
						{errors.expectedRevenue && <FieldError>{errors.expectedRevenue.message}</FieldError>}
					</Field>

					<Field>
						<FieldLabel>سود پیش‌بینی شده (تومان)</FieldLabel>
						<Input type="number" {...register("expectedProfit")} />
						{errors.expectedProfit && <FieldError>{errors.expectedProfit.message}</FieldError>}
					</Field>

					<div className="d-flex gap-3 mt-4">
						
						<button type="submit" disabled={isSubmitting}>
							{initialData ? "ویرایش فاز" : "افزودن فاز"}
						</button>

						<button type="button" onClick={onCancel} disabled={isSubmitting}>
							انصراف
						</button>
					</div>
				</FieldGroup>
			</form>
		</div>
	);
}