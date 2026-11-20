
"use client";

import { Modal } from "@/miz/components/react/modal/page";
import "./delete-confirm-modal.scss";

export default function DeleteConfirmModal({
    open,
    onOpenChange,
    onConfirm,
    title = "حذف این مورد؟",
    description = "آیا از حذف این مورد اطمینان دارید؟",
    loading = false,
}) {
    const handleDelete = async () => {
        await onConfirm?.();
    };

    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
        >
            <div className="delete-confirm-modal" dir="rtl">

                <div className="delete-confirm-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="76"
                        height="76"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v5" />
                        <path d="M14 11v5" />
                    </svg>
                </div>

                <h2 className="delete-confirm-title">
                    {title}
                </h2>

                <p className="delete-confirm-description">
                    {description}
                </p>

                <div className="delete-confirm-actions">

                    <button
                        type="button"
                        className="delete-cancel-btn"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        انصراف
                    </button>

                    <button
                        type="button"
                        className="delete-submit-btn"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "در حال حذف..." : "حذف"}
                    </button>

                </div>
            </div>
        </Modal>
    );
}
