import Link from "next/link";
import { Button } from "@/miz/themes/react/components/button/page";
import { TicketStatusBadge } from "@/miz/themes/react/components/ticket-status-badge/page";

function formatDate(date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export const ticketColumns = [
  {
    accessorKey: "title",
    header: "عنوان تیکت",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ثبت",
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
      className="txt-size-small px-6 font-weight-regular txt-align-end"
        render={
          <Link href={`/madoles/user/support/${row.original.id}`} />
        }
        
        size="sm"
      >
        نمایش
      </Button>
    ),
  },
];