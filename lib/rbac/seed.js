const { PrismaClient } = require("@prisma/client");
const { PERMISSIONS } = require("./permissions");

const prisma = new PrismaClient();

async function main() {
	console.log("Starting database seed...");

	for (const permission of PERMISSIONS) {
		await prisma.permission.upsert({
			where: { perm: permission.name },
			update: { title: permission.title },
			create: permission,
		});
	}

	console.log("Permissions created");

	const allPermissions = await prisma.permission.findMany({
		select: { id: true },
	});

	const superAdminRole = await prisma.role.upsert({
		where: { perm: "SUPERADMIN" },
		update: { title: "سوپر ادمین" },
		create: {
			perm: "SUPERADMIN",
			title: "سوپر ادمین",
			description: "دسترسی کامل به تمامی محتوای سایت",
		},
	});

	await prisma.rolePermission.createMany({
		data: allPermissions.map((permission) => ({
			roleId: superAdminRole.id,
			permissionId: permission.id,
		})),
		skipDuplicates: true,
	});

	console.log("SUPERADMIN role created and permissions assigned");

	await prisma.user.upsert({
		where: { phoneNumber: "09131993023" },
		update: { roleId: superAdminRole.id },
		create: {
			name: "مهدی عربپور",
			username: "superadmin",
			phoneNumber: "09131993023",
			roleId: superAdminRole.id,
		},
	});

	console.log("SUPERADMIN user created");

	console.log("Database seeding completed");
}

main()
	.catch((error) => {
		console.error("Seed failed:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
