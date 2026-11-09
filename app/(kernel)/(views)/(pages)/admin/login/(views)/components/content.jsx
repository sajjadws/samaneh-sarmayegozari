"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoginClient from "@/lib/authentication/is-login-client";
import { login, signup } from "./user-password";
import { Controller, useForm } from "react-hook-form";

export default function ContentPage() {
	const router = useRouter();
	const { session, isPending } = useLoginClient();
	const form = useForm({
		// resolver: zodResolver(phoneNumberSchema),
		// defaultValues: {
		//     phoneNumber,
		// },
		mode: "onChange",
	});

	useEffect(() => {
		if (!isPending && !session) {
			router.replace("/login");
		}
	}, [session, isPending, router]);

	if (isPending || !session) {
		return null;
	}

	async function handleSignup() {
		try {
			const result = await signup();
			console.log("Signup:", result);
		} catch (error) {
			console.error(error);
		}
	}

	async function handleLogin(values) {
		try {
			const result = await login(values);
			console.log("Login:", result);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="w-100 d-flex flex-column justify-content-center align-items-center">
			<h1>hossein</h1>
			{/* <button onClick={handleSignup}>
                Signup
            </button> */}

			{/* <button onClick={handleLogin}>
                Login
            </button> */}
			<form className="d-flex flex-column justify-content-center align-items-center" onSubmit={form.handleSubmit(handleLogin)}>
				<Controller name="email" control={form.control} defaultValue="email@domain.com" render={({ field, fieldState }) => <input type="email" {...field} />} />

				<Controller name="password" control={form.control} defaultValue="password1234" render={({ field, fieldState }) => <input type="password" {...field} />} />

				<button type="submit">Login</button>
			</form>
		</div>
	);
}
