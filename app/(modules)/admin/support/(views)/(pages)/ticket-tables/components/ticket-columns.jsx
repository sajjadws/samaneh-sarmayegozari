
import Link from "next/link";
import { Button } from "@/miz/themes/react/components/button/page";
import { TicketStatusBadge } from "@/miz/themes/react/components/ticket-status-badge/page";

function formatDate(date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export const ticketColumns = [
  {
    accessorKey: "id",
    header: "شناسه",
    cell: ({ getValue }) => (
      <span dir="ltr">{getValue()}</span>
    ),
  },
  {
    accessorKey: "title",
    header: "موضوع",
  },
  {
    accessorKey: "userName",
    header: "کاربر ثبت‌کننده",
  },
  {
    accessorKey: "createdAt",
    header: "زمان درخواست",
    cell: ({ getValue }) => formatDate(getValue()),
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => (
      <TicketStatusBadge status={getValue()} />
    ),
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => (
      <Button
        className="txt-size-small px-6 font-weight-regular"
        render={
          <Link
            href={`/madoles/admin/support/${row.original.id}`}
          />
        }
        size="sm"
      >
        مشاهده
      </Button>
    ),
  },
];
