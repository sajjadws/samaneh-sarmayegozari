import { PrismaClient } from "../lib/generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
}

const url = new URL(databaseUrl);

const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.slice(1)),
    connectionLimit: 5,
});

const prismaDB = new PrismaClient({ adapter });

const permissions = [
    { name: "projects.read", title: "مشاهده پروژه‌ها" },
    { name: "projects.create", title: "ایجاد پروژه" },
    { name: "projects.update", title: "ویرایش پروژه" },
    { name: "projects.delete", title: "حذف پروژه" },

    { name: "users.read", title: "مشاهده کاربران" },
    { name: "users.create", title: "ایجاد کاربر" },
    { name: "users.update", title: "ویرایش کاربر" },
    { name: "users.delete", title: "حذف کاربر" },
];

const roles = [
    {
        name: "admin",
        title: "مدیر کل",
        isSystem: true,
        isSuperAdmin: true,
    },
    {
        name: "manager",
        title: "مدیر پروژه",
        isSystem: true,
        isSuperAdmin: false,
    },
    {
        name: "user",
        title: "کاربر عادی",
        isSystem: true,
        isSuperAdmin: false,
    },
];

async function main() {
    // 1. Create permissions
    for (const permission of permissions) {
        await prismaDB.permission.upsert({
            where: { name: permission.name },
            update: { title: permission.title },
            create: permission,
        });
    }

    // 2. Create roles
    for (const role of roles) {
        await prismaDB.role.upsert({
            where: { name: role.name },
            update: {
                title: role.title,
                isSystem: role.isSystem,
                isSuperAdmin: role.isSuperAdmin,
            },
            create: role,
        });
    }

    // 3. Find manager
    const manager = await prismaDB.role.findUniqueOrThrow({
        where: { name: "manager" },
    });

    // 4. Assign permissions to manager
    const managerPermissions = [
        "projects.read",
        "projects.create",
        "projects.update",
    ];

    for (const name of managerPermissions) {
        const permission = await prismaDB.permission.findUniqueOrThrow({
            where: { name },
        });

        await prismaDB.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: manager.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: manager.id,
                permissionId: permission.id,
            },
        });
    }

    console.log("RBAC seed completed!");
}

main()
    .catch((error) => {
        console.error("RBAC seed failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prismaDB.$disconnect();
    });
