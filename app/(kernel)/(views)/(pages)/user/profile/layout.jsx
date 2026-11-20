import UserPanel from "@/app/(kernel)/layouts/user-panel";
import ProfileLayoutClient from "./components/profile-layout-client";

export default function ProfileLayout({ children }) {
    return (
        <UserPanel>
            <ProfileLayoutClient>{children}</ProfileLayoutClient>
        </UserPanel>
    );
}
