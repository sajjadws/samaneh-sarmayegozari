import { notFound, redirect } from "next/navigation";
import { resolveProfileUser } from "../../actions/profile-access";
import AccountInfoView from "../../components/account-info-view";

export default async function AccountInfoPage() {
    const result = await resolveProfileUser();

    if (result.kind === "unauthenticated") redirect("/sign-in");
    if (result.kind !== "ok") notFound();

    return <AccountInfoView user={result.user} />;
}
