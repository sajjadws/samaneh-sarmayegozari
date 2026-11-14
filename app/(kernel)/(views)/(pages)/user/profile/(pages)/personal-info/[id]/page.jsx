import { notFound, redirect } from "next/navigation";
import { resolveProfileUser } from "../../../actions/profile-access";
import PersonalInfoView from "../../../components/personal-info-view";

export default async function PersonalInfoByIdPage({ params }) {
    const { id } = await params;
    const result = await resolveProfileUser(id);

    if (result.kind === "unauthenticated") redirect("/sign-in");
    if (result.kind !== "ok") notFound();

    return <PersonalInfoView user={result.user} />;
}
