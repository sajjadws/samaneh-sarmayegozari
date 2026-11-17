"use client";

import { createColumnHelper } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { dateToString } from "@/lib/utils";
import { UserStatus } from "@/lib/prisma/prisma-enums";

const columnHelper = createColumnHelper();

function setColorByUser(lengthPermission = 0) {
	switch (lengthPermission) {
		case 0:
			return "bg-information-regular-color";
		case 1:
		case 2:
		case 3:
			return "bg-warning-regular-color";
		default:
			return "bg-success-regular-color";
	}
}

export const columns = [
	// columnHelper.accessor("name", {
	// 	header: "نام و نام خانوادگی",
	// 	cell: ({ row }) => {
	// 		const profileName = [
	// 			row.original.userUtilities?.firstName,
	// 			row.original.userUtilities?.lastName,
	// 		].filter(Boolean).join(" ");

	// 		return (
	// 			<div className="txt-size-subtitle primary-color">
	// 				{profileName || row.original.name || "—"}
	// 			</div>
	// 		);
	// 	},
	// }),
	columnHelper.accessor("name", {
		header: "نام و نام خانوادگی",
		cell: ({ row }) => {
			const profileName = [
				row.original.userUtilities?.firstName,
				row.original.userUtilities?.lastName,
			].filter(Boolean).join(" ");

			return (
				<div className="txt-size-subtitle primary-color">
					{profileName || row.original.name || "—"}
				</div>
			);
		},
	}),
	columnHelper.accessor("phoneNumber", {
		header: "شماره موبایل",
		cell: ({ row }) => (
			<div className="txt-size-subtitle primary-color ltr">
				<span>{row.original.phoneNumber || "—"}</span>
			</div>
		),
	}),
	columnHelper.accessor("userRoles", {
		header: "نقش",
		cell: ({ row }) => (
			<div className="d-flex flex-column align-items-center gap-2">
				{row.original.userRoles?.map((item) => (
					<div
						className={`radius-all-full white-color txt-size-small py-1 px-2 ${setColorByUser(item.role?.permissions?.length || 0)}`}
						key={item.role?.id || item.id}
					>
						{item.role?.title || item.role?.name || "—"}
					</div>
				))}
			</div>
		),
	}),
	columnHelper.accessor("status", {
		header: "وضعیت",
		cell: ({ row }) => {
			const isActive = row.original.status === UserStatus.ACTIVE;

			return (
				<div className="txt-size-subtitle primary-color">
					<span
						className={`radius-all-full px-2 py-1 on-primary-color txt-size-small ${
							isActive ? "bg-success-regular-color" : "bg-danger-regular-color"
						}`}
					>
						{isActive ? "فعال" : "غیرفعال"}
					</span>
				</div>
			);
		},
	}),
	columnHelper.accessor("createdAt", {
		header: "تاریخ عضویت",
		cell: ({ row }) => (
			<div className="txt-size-subtitle primary-color">
				<span>{row.original.createdAt ? dateToString(row.original.createdAt) : "—"}</span>
			</div>
		),
	}),
	columnHelper.display({
		id: "actions",
		header: "عملیات",
		cell: ({ row }) => <CellAction cellData={row.original} />,
	}),
];
