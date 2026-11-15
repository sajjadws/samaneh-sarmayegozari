
"use client";

import CreateTeamModal from "./creat-team-modal";
import { DataTable } from "@/miz/components/react/data-table/data-table";
import { Separator } from "@/miz/themes/react/components/separator/page";

export default function ExecutionTeam({
  teamMembers = [],
  addTeamMember,
  deleteTeamMember,
}) {

  const columns = [
    {
      accessorKey: "fullName",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "description",
      header: "توضیحات",
    },
    {
      accessorKey: "startDate",
      header: "تاریخ شروع",
    },
    {
      accessorKey: "endDate",
      header: "تاریخ پایان",
    },
    {
      accessorKey: "targetAmount",
      header: "مبلغ هدف",
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => deleteTeamMember(row.original.id)}
          className="text-red-500"
        >
          حذف
        </button>
      ),
    },
  ];

  return (
    <div className="px-6 py-8 bg-color radius-all-normal">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          تیم مجری
        </h2>

        <p className="mt-2 text-sm">
          اعضای تیم، اطلاعات تخصصی و مسئولیت هر یک را معرفی کنید.
        </p>
        <Separator />
      </div>

      <CreateTeamModal
        onSave={addTeamMember}
      />

      <DataTable
        className="w-100"
        columns={columns}
        data={teamMembers}
        options={[]}
      />

      {teamMembers.length === 0 && (
        <p className="text-center mt-4 text-sm">
          هنوز عضوی به تیم اجرایی اضافه نشده است.
        </p>
      )}

    </div>
  );
}
