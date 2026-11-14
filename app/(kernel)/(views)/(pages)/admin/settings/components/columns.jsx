"use client";

// import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { dateToString } from "@/lib/utils";
import { UserStatus } from "@/lib/prisma/prisma-enums";

const columnHelper = createColumnHelper();

export const columns = columnHelper.columns([
	columnHelper.accessor("phoneNumber", {
		header: "نام و نام خانوادگی",
		cell: ({ row }) => {
			return (
				<div className="txt-size-subtitle primary-color">
					{row.original.userUtilities?.map((item) => (
						<div key={item.id}>
							{item.firstName} {item.lastName}
						</div>
					))}
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
	columnHelper.accessor("status", {
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
