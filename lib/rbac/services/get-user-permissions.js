import "server-only";

import prismaDB from "@/lib/prisma/prismaDB";


export async function getUserPermissions(userId) {
	const userRoles = await prismaDB.userRole.findMany({
		where: {
			userId,
		},

		select: {
			role: {
				select: {
					permissions: {
						select: {
							permission: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
		},
	});

	const permissions = userRoles.flatMap((item) => item.role.permissions.map((item) => item.permission.name));

	return [...new Set(permissions)];
}
