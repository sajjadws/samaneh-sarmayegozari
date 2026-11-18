
"use client";

import { useState } from "react";

import { Modal } from "@/miz/components/react/modal/page";
import { Button } from "@/miz/components/react/button/page";

import CreateFormPhase from "./creat-form-phase";

const CreatePhaseModal = ({ onSave }) => {
    const [open, setOpen] = useState(false);

    // ذخیره فاز جدید
    const handleSave = async (values) => {
        try {
            await onSave?.(values);

            // بعد از ذخیره موفق مودال بسته شود
            setOpen(false);

        } catch (error) {
            console.error("خطا در ذخیره فاز:", error);
        }
    };

    // انصراف از افزودن فاز
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                افزودن فاز جدید
            </Button>

            <Modal
                open={open}
                onOpenChange={setOpen}
                title="افزودن فاز جدید"
            >
                <div className="flex flex-col gap-2">

                    <CreateFormPhase
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />

                </div>
            </Modal>
        </>
    );
};

export default CreatePhaseModal;
