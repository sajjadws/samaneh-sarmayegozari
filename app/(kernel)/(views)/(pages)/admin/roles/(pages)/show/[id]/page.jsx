import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getRoleDetails, getPermissionCatalog } from "../../../actions/crud";
import RolePermissionsForm from "../../../components/role-permissions-form";

export default async function ShowRolePermissions({ params }) {
    await connection();
    const { id } = await params;

    const [roleResult, permissionsResult] = await Promise.all([
        getRoleDetails(id),
        getPermissionCatalog(),
    ]);

    if (!roleResult?.ok || !roleResult.data) {
        if (roleResult?.status === 404) notFound();
        throw new Error(roleResult?.message || "دریافت اطلاعات نقش ناموفق بود");
    }

    if (!permissionsResult?.ok) {
        throw new Error(permissionsResult?.message || "دریافت فهرست مجوزها ناموفق بود");
    }

    return (
        <section className="section justify-content-start align-items-start gap-8 px-8 py-10">
            <div className="container w-100 h-100 d-flex flex-column gap-6">
                <header className="d-flex flex-column gap-2">
                    <h1>سطح دسترسی نقش</h1>
                    <p className="text-muted">مشاهده مجوزهای فعال نقش «{roleResult.data.title}»</p>
                </header>
                <RolePermissionsForm
                    role={roleResult.data}
                    permissionCatalog={permissionsResult.data || []}
                    mode="show"
                />
            </div>
        </section>
    );
}
