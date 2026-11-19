
"use client";

import { createColumnHelper } from "@tanstack/react-table";
import CellActions from "./cell-actions";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("title", {
    header: "عنوان طرح",
  }),

  columnHelper.accessor("description", {
    header: "توضیحات",
  }),

  columnHelper.accessor("durationDate", {
    header: "مدت زمان اجرا (ماه)",
  }),

  columnHelper.accessor("status", {
    header: "وضعیت طرح",
    cell: ({ getValue }) => {
      const status = getValue();

      const statuses = {
        DRAFT: "پیش‌نویس",
        FUNDRAISING: "جذب سرمایه",
        IN_PROGRESS: "در حال اجرا",
        COMPLETED: "تکمیل‌شده",
      };

      return statuses[status] || status;
    },
  }),

  columnHelper.accessor("createdAt", {
    header: "تاریخ ایجاد",
    cell: ({ getValue }) => {
      const date = getValue();

      return date
        ? new Date(date).toLocaleDateString("fa-IR")
        : "-";
    },
  }),

  columnHelper.display({
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => (
      <CellActions cellData={row.original} />
    ),
  }),
];
