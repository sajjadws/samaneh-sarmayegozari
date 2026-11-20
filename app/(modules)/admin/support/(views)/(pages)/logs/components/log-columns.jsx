
function formatDate(date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export const logColumns = [
  {
    accessorKey: "id",
    header: "شناسه",
  },
  {
    accessorKey: "userName",
    header: "کاربر",
  },
  {
    accessorKey: "description",
    header: "توضیحات",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ",
    cell: ({ getValue }) => formatDate(getValue()),
  },
];
