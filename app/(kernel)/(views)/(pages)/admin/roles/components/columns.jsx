"use client";

// import { IconEdit, IconTrash } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { dateToString } from "@/lib/utils";
import { UserStatus } from "@/lib/prisma/prisma-enums";

const columnHelper = createColumnHelper();

export const columns = columnHelper.columns([
	columnHelper.accessor("role", {
		header: "نقش",
		cell: ({ row }) => {
			return (
				<div className="txt-size-subtitle primary-color">
					<div key={row.original.id}>
						{row.original.title}
					</div>
				</div>
			);
		},
	}),
	columnHelper.accessor("description", {
		header: "توضیحات",
		cell: ({ row }) => {
			return (
				<div className="txt-size-subtitle primary-color">
					<span>{row.original.description}</span>
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
