"use client";

import { createColumnHelper } from "@tanstack/react-table";
import CellActions from "./cell-actions";
// import { formatJalaliDate } from "@/utils/format-date";

const columnHelper = createColumnHelper();

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

  //   columnHelper.accessor("status", {
  //   header: "وضعیت پرداخت سود",
  //   cell: ({ getValue }) => {
  //     const status = getValue();

  //     return status === "FUNDRAISING"
  //       ? "جذب سرمایه"
  //       : status;
  //   },
  // }),
 
  columnHelper.accessor("display", {
    header: "عملیات",
    cell: ({ row }) => {
      return <CellActions cellData={row.original} />;
    },
  }),
]);
