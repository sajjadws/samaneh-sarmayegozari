// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";

// import { Modal } from "@/miz/components/react/modal/page";
// import { Button } from "@/miz/components/react/button/page";
// import { Input } from "@/miz/themes/react/components/input/page";

// import {
// 	Combobox,
// 	ComboboxContent,
// 	ComboboxEmpty,
// 	ComboboxInput,
// 	ComboboxItem,
// 	ComboboxList,
// } from "@/miz/components/react/combobox/page";

// const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

// const initialData = {
// 	name: "",
// 	description: "",
// 	startDate: "",
// 	endDate: "",
// 	targetAmount: "",
// 	expectedIncome: "",
// 	expectedProfit: "",
// };

// const CreateTeamModal = ({ initialMember = null, onSave }) => {
// 	const [open, setOpen] = useState(false);

// 	const {
// 		register,
// 		handleSubmit,
// 		setValue,
// 		watch,
// 		reset,
// 		formState: { errors, isSubmitting },
// 	} = useForm({
// 		defaultValues: initialMember || initialData,
// 	});

// 	const selectedName = watch("name");

// 	const onSubmit = async (data) => {
// 		try {
// 			if (onSave) {
// 				await onSave(data);
// 			}

// 			reset(initialData);
// 			setOpen(false);
// 		} catch (error) {
// 			console.error("خطا در ثبت عضو تیم:", error);
// 		}
// 	};

// 	const handleClose = () => {
// 		setOpen(false);
// 		reset(initialMember || initialData);
// 	};

// 	return (
// 		<>
// 			<Button onClick={() => setOpen(true)}>افزودن عضو جدید</Button>

// 			<Modal open={open} onOpenChange={setOpen} title={initialMember ? "ویرایش عضو" : "افزودن عضو جدید"}>
// 				<div className="px-8 bg-card-color radius-all-normal px-6 py-6">
// 					<div className="mb-6">
// 						<h2 className="text-xl font-bold">{initialMember ? "ویرایش عضو" : "افزودن عضو جدید"}</h2>

// 						<p className="mt-2 text-sm">اطلاعات فردی که در اجرای این طرح مشارکت دارد را وارد کنید.</p>
// 					</div>

// 					<form id="form-team" onSubmit={handleSubmit(onSubmit)}>
// 						{/* نام عضو تیم */}
// 						<div className="mb-4">
// 							<label>نام و نام خانوادگی</label>

// 							<Combobox items={frameworks}>
// 								<ComboboxInput placeholder="یک گزینه انتخاب کنید..." />

// 								<ComboboxContent>
// 									<ComboboxEmpty>موردی پیدا نشد.</ComboboxEmpty>

// 									<ComboboxList>
// 										{(item) => (
// 											<ComboboxItem key={item} value={item}>
// 												{item}
// 											</ComboboxItem>
// 										)}
// 									</ComboboxList>
// 								</ComboboxContent>
// 							</Combobox>

// 							{errors.name && <small className="text-red-500">نام عضو را انتخاب کنید.</small>}
// 						</div>

// 						<div className="d-flex">
// 							<div className="mb-4">
// 								<label>سمت</label>

// 								<Input {...register("position")} placeholder="سمت" />
// 							</div>

// 							<div className="mb-4">
// 								<label>تخصص</label>

// 								<Input {...register("expertise")} placeholder="تخصص" />
// 							</div>
// 						</div>

// 						{/* توضیحات */}
// 						<div className="mb-4 d-flex flex-column">
// 							<label>شرح مسئولیت</label>

// 							<textarea {...register("description")} placeholder="شرح مسئولیت" />
// 						</div>

// 						{/* دکمه‌ها */}
// 						<div className="flex gap-2">
// 							<Button type="submit" disabled={isSubmitting}>
// 								{isSubmitting ? "در حال ثبت..." : initialMember ? "ویرایش" : "افزودن"}
// 							</Button>

// 							<Button type="button" onClick={handleClose}>
// 								انصراف
// 							</Button>
// 						</div>
// 					</form>
// 				</div>
// 			</Modal>
// 		</>
// 	);
// };

// export default CreateTeamModal;

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
			userId: initialMember?.userId || "",
			position: initialMember?.position || "",
			expertise: initialMember?.expertise || "",
			description: initialMember?.description || "",
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
			<div className="px-6 py-6 bg-card-color radius-all-normal">
				<div className="mb-6">
					<h2 className="text-xl font-bold">{initialMember ? "ویرایش عضو تیم" : "افزودن عضو جدید"}</h2>

					<p className="mt-2 text-sm">اطلاعات فردی که در اجرای این طرح مشارکت دارد را وارد کنید.</p>
				</div>

				<form id="form-team" onSubmit={handleSubmit(onSubmit)}>
					{/* انتخاب کاربر */}
					<div className="mb-4">
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

					{/* سمت و تخصص */}
					<div className="d-flex gap-3">
						<div className="mb-4 w-50">
							<label>سمت</label>

							<Input
								{...register("position", {
									required: "سمت را وارد کنید.",
								})}
								placeholder="مثلاً مدیر پروژه"
							/>

							{errors.position && <small className="text-red-500">{errors.position.message}</small>}
						</div>

						<div className="mb-4 w-50">
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

					{/* شرح مسئولیت */}
					<div className="mb-4 d-flex flex-column">
						<label>شرح مسئولیت</label>

						<textarea
							{...register("description")}
							placeholder="شرح مسئولیت عضو تیم را وارد کنید..."
							rows={4}
							className="w-100"
						/>
					</div>

					{/* دکمه‌ها */}
					<div className="flex gap-2">
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
