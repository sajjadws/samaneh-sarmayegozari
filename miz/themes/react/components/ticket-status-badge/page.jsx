import { Badge } from "@/miz/themes/react/components/badge/page";

const statusConfig = {
  UNDER_REVIEW: {
    label: "در حال بررسی",
    variant: "warning",
  },
  ANSWERED: {
    label: "پاسخ داده شده",
    variant: "success",
  },
  CLOSED: {
    label: "بسته شده",
    variant: "secondary",
  },
};

function TicketStatusBadge({ status }) {
  const config = statusConfig[status] ?? {
    label: "نامشخص",
    variant: "default",
  };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export { TicketStatusBadge };