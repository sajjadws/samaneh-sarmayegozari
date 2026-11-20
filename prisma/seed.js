require("dotenv").config();

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../lib/generated/prisma/client");
const { PERMISSIONS } = require("../lib/rbac/permissions");
const { auth } = require("../lib/authentication/auth");

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
	console.log("Starting database seed...");

	for (const permission of PERMISSIONS) {
		await prisma.permission.upsert({
			where: { perm: permission.perm },
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

	let superAdmin = await prisma.user.findUnique({
		where: { phoneNumber: "09131993023" },
	});

	if (!superAdmin) {
		const result = await auth.api.signUpEmail({
			body: {
				name: "مهدی عربپور",
				email: "superadmin@gmail.com",
				username: "superadmin",
				password: "admin1234",
			},
		});

		superAdmin = await prisma.user.findUnique({
			where: { id: result.user.id },
		});

		superAdmin = await prisma.user.update({
			where: { id: superAdmin.id },
			data: {
				phoneNumber: "09131993023",
				roleId: superAdminRole.id,
			},
		});
	} else {
		await prisma.user.update({
			where: { id: superAdmin.id },
			data: { roleId: superAdminRole.id },
		});
	}

	console.log("SUPERADMIN user created/updated");

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
