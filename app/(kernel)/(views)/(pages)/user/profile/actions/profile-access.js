import "server-only";

import { auth } from "@/lib/authentication/auth";
import prismaDB from "@/lib/prisma/prismaDB";
import { headers } from "next/headers";

export async function resolveProfileUser(id) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        return { kind: "unauthenticated" };
    }

    const currentUserId = session.user.id;
    const targetUserId = id || currentUserId;

    const currentUser = await prismaDB.user.findUnique({
        where: {
            id: currentUserId,
        },
        select: {
            userRoles: {
                select: {
                    role: {
                        select: {
                            name: true,
                            isSuperAdmin: true,
                        },
                    },
                },
            },
        },
    });

    const isAdmin = Boolean(
        currentUser?.userRoles?.some(
            ({ role }) =>
                role.isSuperAdmin || role.name === "admin"
        )
    );

    if (targetUserId !== currentUserId && !isAdmin) {
        return { kind: "forbidden" };
    }

    const user = await prismaDB.user.findUnique({
        where: {
            id: targetUserId,
        },
        select: {
            name: true,
            image: true,
            status: true,

            userRoles: {
                select: {
                    role: {
                        select: {
                            name: true,
                            title: true,
                        },
                    },
                },
            },

            userUtilities: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },

        },
    });

    if (!user) {
        return { kind: "not-found" };
    }

    return {
        kind: "ok",
        user,
        profileId:
            targetUserId === currentUserId
                ? null
                : targetUserId,
        isAdmin,
    };
}