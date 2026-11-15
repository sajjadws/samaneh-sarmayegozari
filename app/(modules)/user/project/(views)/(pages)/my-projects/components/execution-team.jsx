
// "use client";

// import CreateTeamModal from "./creat-team-modal";
// import { DataTable } from "@/miz/components/react/data-table/data-table";
// import { Separator } from "@/miz/themes/react/components/separator/page";
// import { Button } from "@/miz/themes/react/components/button/page";
// export default function ExecutionTeam({
//   teamMembers = [],
//   addTeamMember,
//   deleteTeamMember,
// }) {

//   const columns = [
//     {
//       accessorKey: "fullName",
//       header: "نام و نام خانوادگی",
//     },
//     {
//       accessorKey: "description",
//       header: "توضیحات",
//     },
//     {
//       accessorKey: "startDate",
//       header: "تاریخ شروع",
//     },
//     {
//       accessorKey: "endDate",
//       header: "تاریخ پایان",
//     },
//     {
//       accessorKey: "targetAmount",
//       header: "مبلغ هدف",
//     },
//     {
//       id: "actions",
//       header: "عملیات",
//       cell: ({ row }) => (
//         <button
//           type="button"
//           onClick={() => deleteTeamMember(row.original.id)}
//           className="text-red-500"
//         >
//           حذف
//         </button>
//       ),
//     },
//   ];

//   return (
//     <div className="px-8 bg-card-color radius-all-normal px-6 py-6">

//       <div className="mb-6">
//         <h2 className="text-xl font-bold">
//           تیم مجری
//         </h2>

//         <p className="mt-2 text-sm">
//           اعضای تیم، اطلاعات تخصصی و مسئولیت هر یک را معرفی کنید.
//         </p>
//         <Separator />
//       </div>

//       <CreateTeamModal
//         onSave={addTeamMember}
//       />

//       <DataTable
//         className="w-100"
//         columns={columns}
//         data={teamMembers}
//         options={[]}
//       />

//        <div className="project-modal-footer d-flex justify-content-space-between">

//             {currentStep > 0 && (
//               <Button onClick={previousStep}>
//                 مرحله قبل
//               </Button>
//             )}

//             {currentStep < 4 ? (
//               <Button onClick={nextStep}>
//                 مرحله بعد ←
//               </Button>
//             ) : (
//               <Button
//                 disabled={loading}
//                 onClick={handleSubmit}
//               >
//                 {loading ? "در حال ثبت..." : "ثبت نهایی طرح"}
//               </Button>
//             )}

//           </div>

//     </div>
//   );
// }



"use client";

import CreateTeamModal from "./creat-team-modal";

import { DataTable } from "@/miz/components/react/data-table/data-table";

import { Separator } from "@/miz/themes/react/components/separator/page";
import { Button } from "@/miz/themes/react/components/button/page";

export default function ExecutionTeam({
  teamMembers = [],
  addTeamMember,
  deleteTeamMember,
  nextStep,
  previousStep,
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
    <div className="px-8 bg-card-color radius-all-normal px-6 py-6">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          تیم مجری
        </h2>

        <p className="mt-2 text-sm">
          اعضای تیم، اطلاعات تخصصی و مسئولیت هر یک را معرفی کنید.
        </p>

        <Separator />
      </div>

      <CreateTeamModal onSave={addTeamMember} />

      <DataTable
        className="w-100"
        columns={columns}
        data={teamMembers}
        options={[]}
      />

      <div className="project-modal-footer mt-6 d-flex justify-content-space-between">

        <Button onClick={previousStep}>
          مرحله قبل
        </Button>

        <Button onClick={nextStep}>
          مرحله بعد ←
        </Button>

      </div>

    </div>
  );
}
