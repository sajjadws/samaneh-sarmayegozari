"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { authClient } from "@/lib/authentication/auth-client";
import { verifyAdminSession } from "../actions/authentication";

export default function ContentPage() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm({
        defaultValues: { username: "", password: "" },
        mode: "onChange",
    });

    async function handleLogin(values) {
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const { error } = await authClient.signIn.username({
                username: values.username.trim(),
                password: values.password,
            });

            if (error) {
                setErrorMessage(error.message || "نام کاربری یا رمز عبور صحیح نیست.");
                return;
            }

            const access = await verifyAdminSession();

            if (!access.ok) {
                await authClient.signOut();
                setErrorMessage(access.message);
                return;
            }

            router.replace("/admin/dashboard");
            router.refresh();
        } catch {
            await authClient.signOut();
            setErrorMessage("ورود انجام نشد. دوباره تلاش کنید.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <form
                className="d-flex flex-column justify-content-center align-items-center gap-3"
                onSubmit={form.handleSubmit(handleLogin)}
            >
                <Controller
                    name="username"
                    control={form.control}
                    rules={{ required: "نام کاربری را وارد کنید." }}
                    render={({ field }) => (
                        <input {...field} type="text" autoComplete="username" placeholder="نام کاربری" />
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    rules={{ required: "رمز عبور را وارد کنید." }}
                    render={({ field }) => (
                        <input {...field} type="password" defaultValue="123456789" autoComplete="current-password" placeholder="رمز عبور" />
                    )}
                />
                {errorMessage && <p role="alert" className="text-danger">{errorMessage}</p>}
                <button type="submit" disabled={isSubmitting || !form.formState.isValid}>
                    {isSubmitting ? "در حال ورود..." : "ورود"}
                </button>
            </form>
        </div>
    );
}
