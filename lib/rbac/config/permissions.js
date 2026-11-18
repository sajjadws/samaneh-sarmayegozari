export const PERMISSIONS = Object.freeze({
	USERS: Object.freeze({
		READ: "users.read",
		CREATE: "users.create",
		UPDATE: "users.update",
		DELETE: "users.delete",
	}),
	PROJECTS: Object.freeze({
		READ: "projects.read",
		CREATE: "projects.create",
		UPDATE: "projects.update",
		DELETE: "projects.delete",
	}),
	ROLES: Object.freeze({
		READ: "roles.read",
		CREATE: "roles.create",
		UPDATE: "roles.update",
		DELETE: "roles.delete",
		ASSIGN: "roles.assign",
	}),
	PERMISSIONS: Object.freeze({
		READ: "permissions.read",
		CREATE: "permissions.create",
		UPDATE: "permissions.update",
		DELETE: "permissions.delete",
	}),
	TESTS: Object.freeze({ READ: "test.read", CREATE: "test.create", UPDATE: "test.update", DELETE: "test.delete" }),
});

export const PERMISSION_CATALOG = Object.freeze(
	[
		["projects.read", "مشاهده پروژه‌ها"],
		["projects.create", "ایجاد پروژه"],
		["projects.update", "ویرایش پروژه"],
		["projects.delete", "حذف پروژه"],
		["users.read", "مشاهده کاربران"],
		["users.create", "ایجاد کاربر"],
		["users.update", "ویرایش کاربر"],
		["users.delete", "حذف کاربر"],
		["roles.read", "مشاهده نقش‌ها"],
		["roles.create", "ایجاد نقش"],
		["roles.update", "ویرایش نقش"],
		["roles.delete", "حذف نقش"],
		["roles.assign", "تخصیص نقش"],
		["permissions.read", "مشاهده مجوزها"],
		["permissions.create", "ایجاد مجوز"],
		["permissions.update", "ویرایش مجوز"],
		["permissions.delete", "حذف مجوز"],
		["test.read", "مشاهده تست"],
		["test.create", "ایجاد تست"],
		["test.update", "ویرایش تست"],
		["test.delete", "حذف تست"],
	].map(([name, title]) => Object.freeze({ name, title })),
);

export const READ_PERMISSION_NAMES = new Set(
	PERMISSION_CATALOG.filter(({ name }) => name.endsWith(".read")).map(({ name }) => name),
);
export const ALL_PERMISSION_NAMES = Object.freeze(PERMISSION_CATALOG.map(({ name }) => name));

export const ROLE_PERMISSION_CONFIG = Object.freeze({
	manager: Object.freeze({
		"projects.read": "GLOBAL",
		"projects.create": null,
		"projects.update": null,
		"users.read": "OWN",
	}),
	user: Object.freeze({ "projects.read": "OWN" }),
});
