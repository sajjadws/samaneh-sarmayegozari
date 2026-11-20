"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createStaff } from "../actions/create-staff";

const initialValues = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
	email: "",
	username: "",
	password: "",
	roleId: "",
};

export default function CreateStaffForm({ roles = [] }) {
	const router = useRouter();
	const [values, setValues] = useState(initialValues);
	const [busy, setBusy] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);

	function update(field, value) {
		setValues((current) => ({ ...current, [field]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (busy) return;

		setBusy(true);
		setMessage("");
		setError(false);

		try {
			const result = await createStaff(values);
			if (!result?.ok) {
				setError(true);
				setMessage(result?.message || "خطا در ثبت اطلاعات");
				return;
			}

			setMessage(result.message || "کارمند با موفقیت ایجاد شد.");
			setValues({ ...initialValues });
			router.push("/admin/staff-management");
			router.refresh();
		} catch (submitError) {
			console.error("[CREATE_STAFF_FORM]", submitError);
			setError(true);
			setMessage("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
		} finally {
			setBusy(false);
		}
	}

	const inputClass = "form-control w-100";

	return (
		<form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-4" style={{ maxWidth: 680 }}>
			<div className="d-flex flex-column gap-2">
				<label htmlFor="firstName">نام</label>
				<input
					id="firstName"
					name="firstName"
					autoComplete="given-name"
					className={inputClass}
					value={values.firstName}
					onChange={(event) => update("firstName", event.target.value)}
					required
					maxLength={60}
				/>
			</div>

			<div className="d-flex flex-column gap-2">
				<label htmlFor="lastName">نام خانوادگی</label>
				<input
					id="lastName"
					name="lastName"
					autoComplete="family-name"
					className={inputClass}
					value={values.lastName}
					onChange={(event) => update("lastName", event.target.value)}
					required
					maxLength={60}
				/>
			</div>

			<div className="d-flex flex-column gap-2">
				<label htmlFor="phoneNumber">شماره موبایل</label>
				<input
					id="phoneNumber"
					name="phoneNumber"
					type="tel"
					dir="ltr"
					autoComplete="tel"
					className={inputClass}
					value={values.phoneNumber}
					onChange={(event) => update("phoneNumber", event.target.value)}
					required
					maxLength={13}
				/>
			</div>

			<div className="d-flex flex-column gap-2">
				<label htmlFor="email">ایمیل</label>
				<input
					id="email"
					name="email"
					type="text"
					dir="ltr"
					autoComplete="email"
					className={inputClass}
					value={values.email}
					onChange={(event) => update("email", event.target.value)}
					required
					maxLength={254}
				/>
			</div>

			<div className="d-flex flex-column gap-2">
				<label htmlFor="username">نام کاربری</label>
				<input
					id="username"
					name="username"
					type="text"
					dir="ltr"
					autoComplete="username"
					className={inputClass}
					value={values.username}
					onChange={(event) => update("username", event.target.value)}
					required
					maxLength={254}
				/>
			</div>

			<div className="d-flex flex-column gap-2">
				<label htmlFor="password">رمز عبور</label>
				<input
					id="password"
					name="password"
					type="password"
					dir="ltr"
					autoComplete="new-password"
					minLength={8}
					maxLength={128}
					className={inputClass}
					value={values.password}
					onChange={(event) => update("password", event.target.value)}
					required
				/>
				<small>حداقل ۸ کاراکتر</small>
			</div>

			<div className="d-flex flex-column gap-2">
				<label htmlFor="roleId">نقش کارمند</label>
				<select
					id="roleId"
					name="roleId"
					className={inputClass}
					value={values.roleId}
					onChange={(event) => update("roleId", event.target.value)}
					required
				>
					<option value="">انتخاب نقش</option>
					{roles.map((role) => (
						<option key={role.id} value={role.id}>
							{role.title || role.name}
						</option>
					))}
				</select>
				{roles.length === 0 && (
					<small>هیچ نقشی برای انتخاب وجود ندارد؛ ابتدا نقش‌ها را در بخش مدیریت نقش‌ها تعریف کنید.</small>
				)}
			</div>

			{message && (
				<p role="alert" style={{ color: error ? "#c62828" : "#2e7d32" }}>
					{message}
				</p>
			)}

			<div className="d-flex align-items-center gap-3">
				<button type="submit" className="btn btn-primary" disabled={busy || roles.length === 0}>
					{busy ? "در حال ذخیره..." : "ذخیره و ایجاد کارمند"}
				</button>
				<Link href="/admin/staff-management">انصراف</Link>
			</div>
		</form>
	);
}
