// node --env-file=.env --experimental-strip-types prisma/seed.js
// node --env-file=.env --import=tsx prisma/seed.js

import prismaDB from "../lib/prisma/prismaDB.js";
import { auth } from "../lib/authentication/auth.js";
import { PERMISSION_CATALOG, ROLE_PERMISSION_CONFIG, ALL_PERMISSION_NAMES } from "../lib/rbac/config/permissions.js";

const roles = [
  { name: "admin", title: "مدیر کل", isSystem: true, isSuperAdmin: true },
  { name: "manager", title: "مدیر پروژه", isSystem: true, isSuperAdmin: false },
  { name: "user", title: "کاربر عادی", isSystem: true, isSuperAdmin: false },
];

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
    const configured = role.isSuperAdmin
      ? []
      : Object.entries(ROLE_PERMISSION_CONFIG[role.name] ?? {});
    const assignments = configured.map(([name, scope]) => {
      const permissionId = permissionByName.get(name);
      if (!permissionId) throw new Error(`Unknown permission in role config: ${name}`);
      if (name.endsWith(".read") && !["OWN", "GLOBAL"].includes(scope)) {
        throw new Error(`Read permission ${name} requires OWN or GLOBAL scope`);
      }
      if (!name.endsWith(".read") && scope !== null) {
        throw new Error(`Non-read permission ${name} cannot have a scope`);
      }
      return { roleId: roleRecord.id, permissionId, scope };
    });

    await prismaDB.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({ where: { roleId: roleRecord.id } });
      if (assignments.length) await tx.rolePermission.createMany({ data: assignments });
    });
  }
}

// async function seedSuperAdmin() {
//   const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
//   const password = process.env.SUPER_ADMIN_PASSWORD;
//   const username = process.env.SUPER_ADMIN_USERNAME?.trim() || "superAdmin";
//   const name = process.env.SUPER_ADMIN_NAME?.trim() || "Super Admin";

//   if (!email || !password) {
//     throw new Error("SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD must be set to create the superAdmin account.");
//   }
//   if (password.length < 8) throw new Error("SUPER_ADMIN_PASSWORD must contain at least 8 characters.");

//   let user = await prismaDB.user.findUnique({ where: { email }, select: { id: true, email: true, username: true } });
//   const usernameOwner = await prismaDB.user.findUnique({ where: { username }, select: { id: true } });
//   if (usernameOwner && usernameOwner.id !== user?.id) {
//     throw new Error(`SUPER_ADMIN_USERNAME is already assigned to another account: ${username}`);
//   }

//   if (!user) {
//     const created = await auth.api.signUpEmail({
//       body: { name, email, username, password },
//       headers: new Headers(),
//     });
//     user = created?.user;
//   } else if (user.username !== username) {
//     user = await prismaDB.user.update({ where: { id: user.id }, data: { username, displayUsername: username } });
//   }
//   if (!user?.id) throw new Error("Better Auth did not return the created superAdmin user.");

//   const adminRole = await prismaDB.role.findUniqueOrThrow({ where: { name: "admin" } });
//   await prismaDB.userRole.upsert({
//     where: { userId: user.id },
//     update: { roleId: adminRole.id, assignedBy: null },
//     create: { userId: user.id, roleId: adminRole.id },
//   });
//   console.log(`superAdmin account is ready: ${username}`);
// }

async function seedSuperAdmin() {
    const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const username = process.env.SUPER_ADMIN_USERNAME?.trim() || "superAdmin";
    const name = process.env.SUPER_ADMIN_NAME?.trim() || "Super Admin";

    const firstName = process.env.SUPER_ADMIN_FIRST_NAME?.trim();
    const lastName = process.env.SUPER_ADMIN_LAST_NAME?.trim();

    if (!email || !password) {
        throw new Error("SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD must be set.");
    }

    if (!firstName || !lastName) {
        throw new Error("SUPER_ADMIN_FIRST_NAME and SUPER_ADMIN_LAST_NAME must be set.");
    }

    if (password.length < 8) {
        throw new Error("SUPER_ADMIN_PASSWORD must contain at least 8 characters.");
    }

    let user = await prismaDB.user.findUnique({
        where: { email },
        select: { id: true, email: true, username: true },
    });

    const usernameOwner = await prismaDB.user.findUnique({
        where: { username },
        select: { id: true },
    });

    if (usernameOwner && usernameOwner.id !== user?.id) {
        throw new Error(`SUPER_ADMIN_USERNAME is already assigned to another account: ${username}`);
    }

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

    const adminRole = await prismaDB.role.findUniqueOrThrow({
        where: { name: "admin" },
    });

    await prismaDB.$transaction([
        prismaDB.userUtilities.upsert({
            where: { userId: user.id },
            update: {
                firstName,
                lastName,
            },
            create: {
                id: crypto.randomUUID(),
                firstName,
                lastName,
                userId: user.id,
            },
        }),

        prismaDB.userRole.upsert({
            where: { userId: user.id },
            update: {
                roleId: adminRole.id,
                assignedBy: null,
            },
            create: {
                userId: user.id,
                roleId: adminRole.id,
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
