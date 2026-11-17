import NotificationDetailsDialog from "./NotificationDetailsDialog";
import { Button } from "@/miz/themes/react/components/button/page";
import { Badge } from "@/miz/themes/react/components/badge/page";

function formatDate(date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

function NotificationStatusBadge({ status }) {
  const statusConfig = {
    READ: {
      label: "خوانده شده",
      variant: "success",
    },
    UNREAD: {
      label: "خوانده نشده",
      variant: "warning",
    },
  };

  const config = statusConfig[status] ?? {
    label: "نامشخص",
    variant: "secondary",
  };

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}

export const notificationColumns = [
  {
    accessorKey: "title",
    header: "عنوان",
  },
  {
    accessorKey: "description",
    header: "توضیحات",
  },
  {
    accessorKey: "createdAt",
    header: "زمان",
    cell: ({ getValue }) => formatDate(getValue()),
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ getValue }) => (
      <NotificationStatusBadge status={getValue()} />
    ),
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => (
      <NotificationDetailsDialog className="w-fit-content"
        notification={row.original}
      />
    ),
  },
];
