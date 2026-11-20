import { notFound, redirect } from "next/navigation";
import { resolveProfileUser } from "../../../actions/profile-access";
import AccountInfoView from "../../../components/account-info-view";

export default async function AccountInfoByIdPage({ params }) {
    const { id } = await params;
    const result = await resolveProfileUser(id);

    if (result.kind === "unauthenticated") redirect("/sign-in");
    if (result.kind !== "ok") notFound();

    return <AccountInfoView user={result.user} />;
}
