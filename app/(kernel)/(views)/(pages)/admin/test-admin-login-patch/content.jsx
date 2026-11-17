"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./user-password";

export default function ContentPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		setBusy(true);
		setError("");
		try {
			const result = await login({ email, password });
			if (result?.user) {
				router.replace("/admin/dashboard");
				router.refresh();
			} else {
				setError("ایمیل یا رمز عبور صحیح نیست.");
			}
		} catch {
			setError("ورود ناموفق بود. ایمیل و رمز عبور را بررسی کنید.");
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className="w-100 d-flex flex-column justify-content-center align-items-center">
			<form
				onSubmit={handleSubmit}
				className="d-flex flex-column justify-content-center gap-3"
				style={{ width: "100%", maxWidth: 420 }}
			>
				<label htmlFor="admin-email">نام کاربری (ایمیل)</label>
				<input
					id="admin-email"
					type="email"
					dir="ltr"
					autoComplete="username"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
				/>
				<label htmlFor="admin-password">رمز عبور</label>
				<input
					id="admin-password"
					type="password"
					dir="ltr"
					autoComplete="current-password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					required
				/>
				{error && <p role="alert" style={{ color: "#c62828" }}>{error}</p>}
				<button type="submit" disabled={busy}>
					{busy ? "در حال ورود..." : "ورود به پنل مدیریت"}
				</button>
			</form>
		</div>
	);
}
