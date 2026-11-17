"use client";

import Link from "next/link";

export default function CellAction({ cellData }) {
	if (!cellData?.id) return null;

	return (
		<div className="d-flex align-items-center gap-2">
			<Link
				href={`/admin/staff-management/edit/${cellData.id}`}
				className="btn btn-outline-primary"
			>
				ویرایش دسترسی‌ها
			</Link>
		</div>
	);
}
