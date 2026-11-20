"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { updateRole } from "../actions/crud";
import { Button } from "@/miz/themes/react/components/button/page";
import { toast } from "@/miz/themes/react/components/toast/page";

const ACTIONS = [
    { key: "read", label: "مشاهده" },
    { key: "create", label: "ایجاد" },
    { key: "update", label: "ویرایش" },
    { key: "delete", label: "حذف" },
];

function getPermissionParts(permission) {
    const name = permission?.name || "";
    const separator = name.lastIndexOf(".");
    if (separator < 1) return null;

    return {
        resource: name.slice(0, separator),
        action: name.slice(separator + 1),
    };
}

export default function RolePermissionsForm({ role, permissionCatalog, mode = "show" }) {
    const isReadOnly = mode === "show";
    const router = useRouter();

    const initialAssignments = useMemo(() => {
        return (role?.permissions || []).map((item) => ({
            permissionId: item.permissionId || item.permission?.id,
            scope: item.scope || null,
        })).filter((item) => item.permissionId);
    }, [role]);

    const [assignments, setAssignments] = useState(initialAssignments);
    const [saving, setSaving] = useState(false);

    const rows = useMemo(() => {
        const groups = new Map();

        for (const permission of permissionCatalog || []) {
            const parts = getPermissionParts(permission);
            if (!parts) continue;

            if (!groups.has(parts.resource)) {
                groups.set(parts.resource, {
                    key: parts.resource,
                    label: permission.resourceTitle || permission.groupTitle || parts.resource,
                    permissions: {},
                });
            }

            groups.get(parts.resource).permissions[parts.action] = permission;
        }

        return Array.from(groups.values()).sort((a, b) => a.label.localeCompare(b.label, "fa"));
    }, [permissionCatalog]);

    const selectedById = useMemo(
        () => new Map(assignments.map((item) => [item.permissionId, item])),
        [assignments],
    );

    function togglePermission(permission, checked) {
        if (isReadOnly || !permission?.id) return;

        setAssignments((current) => {
            const next = current.filter((item) => item.permissionId !== permission.id);
            if (checked) {
                next.push({
                    permissionId: permission.id,
                    scope: permission.name.endsWith(".read") ? "OWN" : null,
                });
            }
            return next;
        });
    }

    function changeScope(permissionId, scope) {
        setAssignments((current) =>
            current.map((item) =>
                item.permissionId === permissionId ? { ...item, scope } : item,
            ),
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (isReadOnly || saving) return;

        setSaving(true);
        const result = await updateRole(
            role.id,
            {
                name: role.name,
                title: role.title,
                description: role.description || "",
            },
            assignments,
        );
        setSaving(false);

        if (!result?.ok) {
            toast.add({ title: result?.message || "ذخیره دسترسی‌ها ناموفق بود" });
            return;
        }

        toast.add({ title: result.message || "دسترسی‌ها ذخیره شدند" });
        router.refresh();
        router.push(`/admin/roles/show/${role.id}`);
    }

    return (
        <form onSubmit={handleSubmit} className="w-100 d-flex flex-column gap-5">
            <div className="w-100 border radius-md p-4 shadow-sm">
                <div className="d-flex flex-column gap-2 mb-5">
                    <h2 className="txt-size-subtitle">{role.title}</h2>
                    <p className="txt-size-caption text-muted">
                        {isReadOnly
                            ? "مجوزهای فعال این نقش در جدول زیر نمایش داده شده‌اند."
                            : "مجوزهای موردنظر را انتخاب کنید و سپس تغییرات را ذخیره کنید."}
                    </p>
                </div>

                <div className="w-100 overflow-x-auto">
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th className="text-start p-3">بخش</th>
                                {ACTIONS.map((action) => (
                                    <th key={action.key} className="text-center p-3">
                                        {action.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.key}>
                                    <td className="p-3">{row.label}</td>
                                    {ACTIONS.map((action) => {
                                        const permission = row.permissions[action.key];
                                        const assignment = permission
                                            ? selectedById.get(permission.id)
                                            : null;

                                        return (
                                            <td key={action.key} className="text-center p-3">
                                                {permission ? (
                                                    <div className="d-inline-flex flex-column align-items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={Boolean(assignment)}
                                                            disabled={isReadOnly}
                                                            onChange={(event) =>
                                                                togglePermission(permission, event.target.checked)
                                                            }
                                                            aria-label={`${row.label} - ${action.label}`}
                                                        />
                                                        {action.key === "read" && assignment && (
                                                            <select
                                                                value={assignment.scope || "OWN"}
                                                                disabled={isReadOnly}
                                                                onChange={(event) =>
                                                                    changeScope(permission.id, event.target.value)
                                                                }
                                                                className="form-control txt-size-caption"
                                                                aria-label={`محدوده مشاهده ${row.label}`}
                                                            >
                                                                <option value="OWN">فقط موارد خودم</option>
                                                                <option value="GLOBAL">همه موارد</option>
                                                            </select>
                                                        )}
                                                        {isReadOnly && action.key === "read" && assignment && (
                                                            <span className="txt-size-caption text-muted">
                                                                {assignment.scope === "GLOBAL" ? "همه موارد" : "موارد خود"}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted">—</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={ACTIONS.length + 1} className="text-center p-5">
                                        هیچ مجوزی برای نمایش ثبت نشده است.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="d-flex align-items-center gap-2">
                {isReadOnly ? (
                    !role.isSuperAdmin && (
                        <Button type="button" onClick={() => router.push(`/admin/roles/edit/${role.id}`)}>
                            ویرایش دسترسی‌ها
                        </Button>
                    )
                ) : (
                    <>
                        <Button type="submit" disabled={saving}>
                            {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push(`/admin/roles/show/${role.id}`)}
                        >
                            انصراف
                        </Button>
                    </>
                )}
            </div>
        </form>
    );
}
