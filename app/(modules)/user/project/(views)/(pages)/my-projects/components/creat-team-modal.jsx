"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/miz/components/react/modal/page";
import { Button } from "@/miz/components/react/button/page";
import { Input } from "@/miz/themes/react/components/input/page";
import {
	Combobox,
	ComboboxInput,
	ComboboxContent,
	ComboboxList,
	ComboboxItem,
	ComboboxEmpty,
} from "@/miz/components/react/combobox/page";
import { getTeamUsers } from "../actions/crud";

const initialData = {
	userId: "",
	position: "",
	expertise: "",
	description: "",
};

export default function CreateTeamModal({ open, onOpenChange, initialMember = null, onSave }) {
	const [users, setUsers] = useState([]);
	const [loadingUsers, setLoadingUsers] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: initialData,
	});

	// دریافت کاربران و تنظیم اطلاعات اولیه فرم
	useEffect(() => {
		if (!open) return;

		const fetchUsers = async () => {
			setLoadingUsers(true);

			try {
				const result = await getTeamUsers();

				if (result.ok) {
					setUsers(result.data);
				} else {
					console.error(result.message);
				}
			} catch (error) {
				console.error("خطا در دریافت کاربران:", error);
			} finally {
				setLoadingUsers(false);
			}
		};

		fetchUsers();

		reset({
			userId: initialMember?.userId || "0408546b-97d6-4d9f-aecd-8bcd4f311401",
			position: initialMember?.position || "lndv",
			expertise: initialMember?.expertise || "برنامه نویس",
			description: initialMember?.description || "سیبلاتنمک",
		});
	}, [open, initialMember, reset]);

	const selectedUserId = watch("userId");

	const onSubmit = async (data) => {
		try {
			await onSave(data);
		} catch (error) {
			console.error("خطا در ذخیره عضو تیم:", error);
		}
	};

	const handleClose = () => {
		reset(initialData);
		onOpenChange(false);
	};

	return (
		<Modal open={open} onOpenChange={onOpenChange} title={initialMember ? "ویرایش عضو تیم" : "افزودن عضو جدید"}>
			<div className="bg-color radius-all-normal form-phase d-flex flex-column gap-5">
				<div className="">
					<h2 className="txt-size-normal font-weight-medium">
						{initialMember ? "ویرایش عضو تیم" : "افزودن عضو جدید"}
					</h2>
					<p className="secondary-text-color txt-size-subtitle">
						اطلاعات فردی که در اجرای این طرح مشارکت دارد را وارد کنید.
					</p>
				</div>

				<form id="form-team" onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-6">
					<div className="d-flex flex-column gap-1">
						<label>نام و نام خانوادگی</label>

						<Combobox>
							<ComboboxInput placeholder="کشور را انتخاب کنید..." showTrigger showClear />

							<ComboboxContent>
								<ComboboxEmpty>کشوری پیدا نشد.</ComboboxEmpty>

								<ComboboxList>
									<ComboboxItem value="iran">ایران</ComboboxItem>

									<ComboboxItem value="germany">آلمان</ComboboxItem>

									<ComboboxItem value="france">فرانسه</ComboboxItem>

									<ComboboxItem value="turkey">ترکیه</ComboboxItem>

									<ComboboxItem value="canada">کانادا</ComboboxItem>
								</ComboboxList>
							</ComboboxContent>
						</Combobox>

						{errors.userId && <small className="text-red-500">انتخاب نام کاربر الزامی است.</small>}
					</div>

					<div className="d-flex gap-6">
						<div className="d-flex flex-column gap-1 w-50">
							<label>سمت</label>

							<Input
								{...register("position", {
									required: "سمت را وارد کنید.",
								})}
								placeholder="مثلاً مدیر پروژه"
							/>

							{errors.position && <small className="text-red-500">{errors.position.message}</small>}
						</div>

						<div className="d-flex flex-column gap-1 w-50">
							<label>تخصص</label>

							<Input
								{...register("expertise", {
									required: "تخصص را وارد کنید.",
								})}
								placeholder="مثلاً برنامه‌نویسی"
							/>

							{errors.expertise && <small className="text-red-500">{errors.expertise.message}</small>}
						</div>
					</div>

					<div className=" d-flex flex-column gap-1">
						<label>شرح مسئولیت</label>

						<textarea
							{...register("description")}
							placeholder="شرح مسئولیت عضو تیم را وارد کنید..."
							rows={4}
							className="w-100"
						/>
					</div>

					<div className="d-flex justify-content-end gap-2">
						<Button type="submit" disabled={isSubmitting || loadingUsers}>
							{isSubmitting ? "در حال ثبت..." : initialMember ? "ویرایش" : "افزودن"}
						</Button>

						<Button type="button" onClick={handleClose}>
							انصراف
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
}
