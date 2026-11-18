
"use client";

import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import CreatePhaseModal from "./creat-phase-modal";
import CreateFormPhase from "./creat-form-phase";
import DeleteConfirmModal from "./delete-confirm-modal";

import { DataTable } from "@/miz/components/react/data-table/data-table";
import { Modal } from "@/miz/components/react/modal/page";

import { Separator } from "@/miz/themes/react/components/separator/page";
import { Button } from "@/miz/themes/react/components/button/page";

export default function TechnicalDetailsProject({
    formData,
    updateField,
    currentStep,
    nextStep,
    previousStep,
}) {

    // اطلاعات فازها
    const phases = formData?.phases ?? [];

    // وضعیت مودال ویرایش
    const [editOpen, setEditOpen] = useState(false);

    // وضعیت مودال حذف
    const [deleteOpen, setDeleteOpen] = useState(false);

    // فاز انتخاب شده
    const [selectedPhase, setSelectedPhase] = useState(null);

    // وضعیت حذف
    const [loading, setLoading] = useState(false);


    // افزودن فاز جدید
    const addPhase = (phase) => {
        const newPhase = {
            ...phase,
            id: crypto.randomUUID(),
        };

        updateField("phases", (prevPhases) => [
            ...(prevPhases ?? []),
            newPhase,
        ]);
    };


    // باز کردن فرم ویرایش
    const handleEdit = (phase) => {
        setSelectedPhase(phase);
        setEditOpen(true);
    };


    // ذخیره ویرایش فاز
    const handleEditSave = async (values) => {
        if (!selectedPhase) return;

        updateField("phases", (prevPhases) =>
            (prevPhases ?? []).map((phase) =>
                phase.id === selectedPhase.id
                    ? {
                        ...phase,
                        ...values,
                        id: phase.id,
                    }
                    : phase
            )
        );

        setEditOpen(false);
        setSelectedPhase(null);
    };


    // باز کردن مودال حذف
    const handleDeleteClick = (phase) => {
        setSelectedPhase(phase);
        setDeleteOpen(true);
    };


    // حذف فاز
    const handleDelete = async () => {
        if (!selectedPhase) return;

        setLoading(true);

        try {
            updateField("phases", (prevPhases) =>
                (prevPhases ?? []).filter(
                    (phase) => phase.id !== selectedPhase.id
                )
            );

            setDeleteOpen(false);
            setSelectedPhase(null);

        } catch (error) {
            console.error("خطا در حذف فاز:", error);
        } finally {
            setLoading(false);
        }
    };


    // تعریف ستون‌های جدول
    const columnHelper = createColumnHelper();

    const columns = [

        columnHelper.accessor("title", {
            header: "عنوان فاز",
        }),

        columnHelper.accessor("description", {
            header: "توضیحات",
        }),

        columnHelper.accessor("startDate", {
            header: "تاریخ شروع",
        }),

        columnHelper.accessor("endDate", {
            header: "تاریخ پایان",
        }),

        columnHelper.accessor("targetAmount", {
            header: "مبلغ هدف",
        }),

        columnHelper.accessor("expectedRevenue", {
            header: "درآمد پیش‌بینی شده",
        }),

        columnHelper.accessor("expectedProfit", {
            header: "سود پیش‌بینی شده",
        }),

        columnHelper.display({
            id: "operations",
            header: "عملیات",

            cell: ({ row }) => {

                const phase = row.original;

                return (
                    <div className="flex items-center justify-center gap-2">

                        {/* ویرایش */}
                        <Button
                            type="button"
                            size="icon"
                            onClick={() => handleEdit(phase)}
                        >
                            <IconEdit />
                        </Button>

                        {/* حذف */}
                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDeleteClick(phase)}
                        >
                            <IconTrash />
                        </Button>

                    </div>
                );
            },
        }),

    ];


    return (
        <div className="px-8 bg-card-color radius-all-normal py-6">

            {/* عنوان */}
            <div className="mb-6">

                <h2 className="text-xl font-bold">
                    اطلاعات فنی طرح
                </h2>

                <p className="mt-2 text-sm">
                    فازهای اجرای طرح و زمان‌بندی هر فاز را مشخص کنید.
                </p>

                <Separator />

            </div>


            {/* افزودن فاز */}
            <CreatePhaseModal onSave={addPhase} />


            {/* جدول فازها */}
            <DataTable
                className="w-100"
                columns={columns}
                data={phases}
                options={[]}
            />


            {/* مودال ویرایش فاز */}
            <Modal
                open={editOpen}
                onOpenChange={(value) => {
                    setEditOpen(value);

                    if (!value) {
                        setSelectedPhase(null);
                    }
                }}
                title="ویرایش فاز"
            >

                {selectedPhase && (
                    <CreateFormPhase
                        key={selectedPhase.id}
                        initialData={selectedPhase}
                        onSave={handleEditSave}
                        onCancel={() => {
                            setEditOpen(false);
                            setSelectedPhase(null);
                        }}
                    />
                )}

            </Modal>


            {/* مودال تأیید حذف */}
            <DeleteConfirmModal
                open={deleteOpen}
                onOpenChange={(value) => {
                    setDeleteOpen(value);

                    if (!value) {
                        setSelectedPhase(null);
                    }
                }}
                onConfirm={handleDelete}
                loading={loading}
                title="حذف این فاز؟"
                description="آیا از حذف این فاز اطمینان دارید؟ این عملیات قابل بازگشت نیست."
            />


            {/* دکمه‌های مراحل */}
            <div className="project-modal-footer mt-6 d-flex justify-content-space-between">

                <Button
                    type="button"
                    onClick={previousStep}
                >
                    مرحله قبل
                </Button>

                <Button
                    type="button"
                    onClick={nextStep}
                >
                    مرحله بعد ←
                </Button>

            </div>

        </div>
    );
}
