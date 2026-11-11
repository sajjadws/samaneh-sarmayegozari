import "server-only";

import prismaDB from "@/lib/prisma/prismaDB";

export async function getUserRoles(userId) {
	const userRoles = await prismaDB.userRole.findMany({
		where: {
			userId,
		},

		select: {
			role: {
				select: {
					id: true,
					name: true,
					title: true,
					isSystem: true,
					isSuperAdmin: true,
				},
			},
		},
	});

	return userRoles.map((item) => item.role);
}
