import "server-only";
import prismaDB from "@/lib/prisma/prismaDB";

// export async function getUserRoles(userId) {
// 	const assignment = await prismaDB.userRole.findUnique({
// 		where: { userId },
// 		select: { role: { select: { id: true, name: true, title: true, isSystem: true, isSuperAdmin: true } } },
// 	});
// 	return assignment?.role ? [assignment.role] : [];
// }
export async function getUserRoles(userId) {
	const assignment = await prismaDB.userRole.findUnique({
		where: { userId },
		select: { role: { select: { id: true, name: true, title: true, isSystem: true, isSuperAdmin: true } } },
	});

	return assignment?.role ? [assignment.role] : [];
}
