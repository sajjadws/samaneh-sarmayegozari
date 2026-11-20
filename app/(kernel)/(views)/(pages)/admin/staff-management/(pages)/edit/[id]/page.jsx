import { notFound } from "next/navigation";
import {
	getStaffDetails,
	getStaffPermissionCatalog,
} from "../../../actions/crud";
import UserPermissionsForm from "../../../components/user-permissions-form";

export default async function EditStaffPermissionsPage({ params }) {
	const { id } = await params;

	const [staffResult, permissionResult] = await Promise.all([
		getStaffDetails(id),
		getStaffPermissionCatalog(),
	]);

	if (staffResult.status === 404) notFound();

	if (!staffResult.ok || !permissionResult.ok) {
		return (
			<section className="section justify-content-start align-items-start gap-8 px-8 py-10">
				<div className="container w-100 h-100 gap-4">
					<h1>ویرایش دسترسی کارمند</h1>
					<p role="alert">
						{staffResult.message || permissionResult.message || "دریافت اطلاعات با خطا مواجه شد."}
					</p>
				</div>
			</section>
		);
	}

	return (
		<section className="section justify-content-start align-items-start gap-8 px-8 py-10">
			<div className="container w-100 h-100 gap-8">
				<div className="block w-100 d-flex flex-column align-items-start gap-2">
					<h1>ویرایش دسترسی کارمند</h1>
					<p>مجوزهای مستقیم این کارمند را مدیریت کنید.</p>
				</div>
				<UserPermissionsForm
					key={staffResult.data.id}
					user={staffResult.data}
					permissionCatalog={permissionResult.data || []}
					mode="edit"
				/>
			</div>
		</section>
	);
}
