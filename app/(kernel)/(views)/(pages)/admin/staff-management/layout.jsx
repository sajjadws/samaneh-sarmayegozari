import UserPanel from "@/app/(kernel)/layouts/user-panel";
import { PERMISSIONS } from "@/lib/rbac/permissions";
// import "./user.css";

export default function UsersLayout({ children }) {
    return (
        <UserPanel permission={PERMISSIONS.USERS.READ}>
            <section className="section justify-content-start align-items-start gap-8 px-8 py-10">
                <div className="container w-100 h-100 gap-8">
                    {children}
                </div>
            </section>
        </UserPanel>
    );
}
