"use client";

// import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { dateToString } from "@/lib/utils";
import { BankAccountStatus, UserStatus } from "@/lib/prisma/prisma-enums";

const columnHelper = createColumnHelper();

function setColorByBankAccountStatus(status) {
	switch (status) {
		case BankAccountStatus.PENDING:
			return "bg-warning-regular-color";
		case BankAccountStatus.REJECTED:
			return "bg-danger-regular-color";
		case BankAccountStatus.VERIFIED:
			return "bg-success-regular-color";
	}
}

function setLabelByBankAccountStatus(label) {
	switch (label) {
		case BankAccountStatus.PENDING:
			return "در حال بررسی";
		case BankAccountStatus.REJECTED:
			return "رد شده";
		case BankAccountStatus.VERIFIED:
			return "تایید شده";
	}
}

export const columns = columnHelper.columns([
	columnHelper.accessor("fullName", {
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
	columnHelper.accessor("bankStatus", {
		header: "وضعیت احراز هویت",
		cell: ({ row }) => {
			return (
				<div className="txt-size-subtitle primary-color">
					{row.original.wallet?.bankAccounts.map((bankAccount) => (
						<span key={bankAccount.id} className={utils.cn("radius-all-full px-2 py-1 on-primary-color txt-size-small", setColorByBankAccountStatus(bankAccount.status))}>{setLabelByBankAccountStatus(bankAccount.status)}</span>
					))}
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
