import prismaDB from "../lib/prisma/prismaDB.js";
import { auth } from "../lib/authentication/auth.js";
import { PERMISSION_CATALOG, ALL_PERMISSION_NAMES } from "../lib/rbac/config/permissions.js";

const roles = [{ name: "superAdmin", title: "مدیر کل" }];

async function seedPermissions() {
	for (const permission of PERMISSION_CATALOG) {
		await prismaDB.permission.upsert({
			where: { name: permission.name },
			update: { title: permission.title },
			create: permission,
		});
	}
	await prismaDB.permission.deleteMany({ where: { name: { notIn: [...ALL_PERMISSION_NAMES] } } });
}

async function seedRoles() {
	for (const role of roles) {
		await prismaDB.role.upsert({
			where: { name: role.name },
			update: role,
			create: role,
		});
	}

	const allPermissions = await prismaDB.permission.findMany({ select: { id: true, name: true } });
	const permissionByName = new Map(allPermissions.map((item) => [item.name, item.id]));

	for (const role of roles) {
		const roleRecord = await prismaDB.role.findUniqueOrThrow({ where: { name: role.name } });
		const configured = [];

		const assignments = configured.map(([name]) => {
			const permissionId = permissionByName.get(name);
			if (!permissionId) throw new Error(`Unknown permission in role config: ${name}`);
			return { roleId: roleRecord.id, permissionId };
		});

		await prismaDB.$transaction(async (tx) => {
			await tx.rolePermission.deleteMany({ where: { roleId: roleRecord.id } });
			if (assignments.length) await tx.rolePermission.createMany({ data: assignments });
		});
	}
}

async function seedSuperAdmin() {
	const email = "root@gmail.com";
	const password = "123456789";
	const username = "root";
	const name = "Super Admin";
	const firstName = "Super";
	const lastName = "Admin";

	let user = await prismaDB.user.findUnique({
		where: { email },
		select: { id: true, email: true, username: true },
	});

	if (!user) {
		const created = await auth.api.signUpEmail({
			body: { name, email, username, password },
			headers: new Headers(),
		});

		user = created?.user;
	} else if (user.username !== username) {
		user = await prismaDB.user.update({
			where: { id: user.id },
			data: { username, displayUsername: username },
		});
	}

	if (!user?.id) {
		throw new Error("Better Auth did not return the created superAdmin user.");
	}

	await prismaDB.$transaction([
		prismaDB.userUtilities.upsert({
			where: { userId: user.id },
			update: {
				firstName,
				lastName,
			},
			create: {
				id: "djfhsfjfdg",
				firstName,
				lastName,
				userId: user.id,
			},
		}),
	]);

	console.log(`superAdmin account is ready: ${username}`);
}

async function main() {
	await seedPermissions();
	await seedRoles();
	await seedSuperAdmin();
	console.log("RBAC seed completed!");
}

main()
	.catch((error) => {
		console.error("RBAC seed failed:", error);
		process.exitCode = 1;
	})
	.finally(async () => prismaDB.$disconnect());
