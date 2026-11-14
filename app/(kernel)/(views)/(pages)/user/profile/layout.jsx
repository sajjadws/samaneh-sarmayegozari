// ""

import { Suspense } from "react";
import ProfileLayoutClient from "./components/profile-layout-client";

export default function ProfileLayout({ children }) {
    // return <ProfileLayoutClient>{children}</ProfileLayoutClient>;
    return <Suspense>
        <ProfileLayoutClient>{children}</ProfileLayoutClient>
    </Suspense>;
}
