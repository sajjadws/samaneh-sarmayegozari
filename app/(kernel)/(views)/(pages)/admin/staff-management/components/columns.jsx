"use client";

// import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { dateToString } from "@/lib/utils";
import { UserStatus } from "@/lib/prisma/prisma-enums";

const columnHelper = createColumnHelper();

function setColorByUser(lengthPermission) {
	switch (lengthPermission) {
		case 0:
			return "bg-information-regular-color";

		case 1:
		case 2:
		case 3:
			return "bg-warning-regular-color";

		case 4:
			return "bg-success-regular-color";

		default:
			return "bg-success-regular-color";
	}
}

export const columns = columnHelper.columns([
	columnHelper.accessor("firstName", {
		header: "نام و نام خانوادگی",
		cell: ({ row }) => {
			return (
				<div className="txt-size-subtitle primary-color">
					<div key={row.original.userUtilities?.id}>
						{row.original.userUtilities?.firstName} {row.original.userUtilities?.lastName}
					</div>
				</div>
			);
		},
	}),
	columnHelper.accessor("phoneNumber", {
		header: "شماره موبایل",
		cell: ({ row }) => {
			return (
				<div className="txt-size-subtitle primary-color ltr">
					<span>{row.original.phoneNumber}</span>
				</div>
			);
		},
	}),
	columnHelper.accessor("roles", {
		header: "نقش",
		cell: ({ row }) => {
			return (
				<div className="d-flex flex-column align-items-center gap-2">
					{row.original.userRoles?.map((item) => (
						console.log(item),
						<div className={utils.cn("radius-all-full white-color txt-size-small py-1 px-2", setColorByUser(item.role.permissions.length))} key={item.role.id}>
							{item.role.title}
						</div>
					))}
				</div>
			);
		},
	}),
	columnHelper.accessor("createdAt", {
		header: "تاریخ ثبت نام",
		cell: ({ row }) => {
			return (
				<div className="txt-size-subtitle primary-color">
					<span>{dateToString(row.original.createdAt)}</span>
				</div>
			);
		},
	}),
	columnHelper.accessor("userStatus", {
		header: "وضعیت حساب",
		cell: ({ row }) => {
			return (
				<div className="txt-size-subtitle primary-color">
					<span
						className={utils.cn(
							"radius-all-full px-2 py-1 on-primary-color txt-size-small",
							row.original.status == UserStatus.ACTIVE
								? "bg-success-regular-color"
								: "bg-danger-regular-color",
						)}
					>
						{row.original.status == UserStatus.ACTIVE ? "فعال" : "غیر فعال"}
					</span>
				</div>
			);
		},
	}),
	columnHelper.accessor("status", {
		header: "وضعیت احراز هویت",
		cell: ({ row }) => {
			return (
				<div className="txt-size-subtitle primary-color">
					<span>{row.original.status}</span>
				</div>
			);
		},
	}),
	columnHelper.accessor("display", {
		header: "عملیات",
		cell: ({ row }) => {
			return <CellAction cellData={row.original} />;
		},
	}),
]);
