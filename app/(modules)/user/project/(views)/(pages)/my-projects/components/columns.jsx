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
    header: "عنوان طرح",
  }),

  columnHelper.accessor("incomeAmount", {
    header: "مبلغ جذب شده",
  }),
 
  
   columnHelper.accessor("status", {
    header: "وضعیت طرح",
    cell: ({ getValue }) => {
      const status = getValue();

      return status === "FUNDRAISING"
        ? "جذب سرمایه"
        : status;
    },
  }),

  columnHelper.accessor("createdAt", {
    header: "تاریخ سرمایه گذاری",
     
  }),

   columnHelper.accessor("profitAmount", {
    header: "سود",
  }),

  //   columnHelper.accessor("profitAmount", {
  //   header: "وضعیت پرداخت سود",
  // }),

  //   columnHelper.accessor("", {
  //   header: "وضعیت عودت",
  // }),
 
  columnHelper.accessor("display", {
    header: "عملیات",
    cell: ({ row }) => {
      return <CellActions cellData={row.original} />;
    },
  }),
]);
