import prismaDB from "@/lib/prisma/prismaDB";
import CreateStaffForm from "../../components/create-staff-form";

export default async function CreateStaffPage() {
	const roles = await prismaDB.role.findMany({
		where: { isSuperAdmin: false },
		select: { id: true, name: true, title: true },
		orderBy: { title: "asc" },
	});

	return (
		<section className="section justify-content-start align-items-start gap-8 px-8 py-10">
			<div className="container w-100 h-100 gap-8">
				<div className="block w-100 d-flex flex-column align-items-start gap-2">
					<h1>افزودن کارمند جدید</h1>
					<p>اطلاعات کارمند را وارد کنید تا حساب ورود او ساخته شود.</p>
				</div>
				<CreateStaffForm roles={roles} />
			</div>
		</section>
	);
}
