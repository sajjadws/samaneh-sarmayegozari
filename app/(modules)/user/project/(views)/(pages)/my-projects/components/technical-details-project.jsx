
import CreatePhaseModal from "./creat-phase-modal";

import { DataTable } from "@/miz/components/react/data-table/data-table";
import { columns } from "./columns";

export default function TechnicalDetailsProject({
  currentStep,
  loading,
  nextStep,
  previousStep,
  handleSubmit,
}) {

  return (
    <div className="px-6 py-8 bg-color radius-all-normal">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          اطلاعات فنی طرح
        </h2>

        <p className="mt-2 text-sm">
          فازهای اجرای طرح و زمان‌بندی هر فاز را مشخص کنید.
        </p>
      </div>

      <CreatePhaseModal />

      <DataTable
        className="w-100"
        columns={columns}
        data={[]}
        options={[]}
      />

    </div>
  );
}
