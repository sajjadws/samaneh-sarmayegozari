"use client";

import { useState } from "react";

import { Modal } from "@/miz/components/react/modal/page";
import { Button } from "@/miz/components/react/button/page";
import { Plus } from "lucide-react";
import CreateFormPhase from "./creat-form-phase";

import { createPhase } from "../actions/crud";

export default function CreatePhaseModal({ projectId, onSaved }) {
    const [open, setOpen] = useState(false);

    const handleSave = async (values) => {
        try {
            const result = await createPhase(projectId, values);

            if (!result?.ok) {
                throw new Error(result?.message || "خطا در ایجاد فاز");
            }

            alert("فاز با موفقیت ایجاد شد.");

            setOpen(false);

            await onSaved?.();

        } catch (error) {
            console.error("Create phase error:", error);
            alert(error.message || "خطا در ایجاد فاز");
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>
            <Plus />
                افزودن فاز جدید
            </Button>

            <Modal
                open={open}
                onOpenChange={setOpen}
                title="افزودن فاز جدید"
            >
                {open && (
                    <CreateFormPhase
                        key="new-phase"
                        initialData={null}
                        onSave={handleSave}
                        onCancel={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    );
}