"use server";

import { resolveProfileUser } from "../actions/profile-access";

/**
 * Used by the client-side profile sidebar.
 * Returns null for unauthenticated, forbidden, or missing profiles.
 * Authorization is always rechecked on the server.
 */
export async function getProfileSidebarData(id) {
    const result = await resolveProfileUser(id);

    if (result.kind !== "ok") {
        return null;
    }

    return {
        user: result.user,
        profileId: result.profileId,
    };
}
