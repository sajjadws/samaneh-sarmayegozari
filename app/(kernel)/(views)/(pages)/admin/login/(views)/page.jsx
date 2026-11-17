import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import ContentPage from "./components/content";
import { getAdminLoginStatus } from "./actions/authentication";
import { connection } from "next/server";

export default async function LoginAdminPage() {
    await connection();
    const status = await getAdminLoginStatus();

    if (status.authenticated && !status.isAdmin) notFound();
    if (status.isAdmin) redirect("/admin/dashboard");

    return (
        <Suspense>
            <ContentPage />
        </Suspense>
    );
}
