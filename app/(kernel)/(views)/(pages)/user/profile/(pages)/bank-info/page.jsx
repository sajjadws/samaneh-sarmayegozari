import { notFound, redirect } from "next/navigation";
import { resolveProfileUser } from "../../actions/profile-access";
import BankInfoView from "../../components/bank-info-view";

export default async function BankInfoPage() {
    const result = await resolveProfileUser();

    if (result.kind === "unauthenticated") redirect("/sign-in");
    if (result.kind !== "ok") notFound();

    return <BankInfoView user={result.user} />;
}
