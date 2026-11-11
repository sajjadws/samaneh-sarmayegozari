"use client";

import { createColumnHelper } from "@tanstack/react-table";
import CellActions from "./cell-actions";
// import { formatJalaliDate } from "@/utils/format-date";

const columnHelper = createColumnHelper();

const statusLabels = {
  PENDING: "در انتظار تأیید",
  APPROVED: "تأیید شده",
  REJECTED: "رد شده",
};

export const columns = columnHelper.columns([

  columnHelper.accessor("title", {
    header: "عنوان",
  }),
  columnHelper.accessor("description", {
    header: "توضیحات",
  }),
  
   columnHelper.accessor("status", {
    header: "وضعیت",
    cell: ({ getValue }) => {
      const status = getValue();

      return status === "APPROVED"
        ? "تأیید شده"
        : status;
    },
  }),

  columnHelper.accessor("publishDate", {
    header: "تاریخ انتشار",
      cell: ({ row }) => {
      return formatJalaliDate(row.original.publishDate);
    },
  }),
 
  columnHelper.accessor("display", {
    header: "عملیات",
    cell: ({ row }) => {
      return <CellActions cellData={row.original} />;
    },
  }),
]);
