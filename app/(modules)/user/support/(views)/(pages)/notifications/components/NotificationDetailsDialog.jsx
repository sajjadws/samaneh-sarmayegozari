
"use client";

import { useState } from "react";

import {
  markNotificationAsRead,
} from "@/app/(modules)/user/support/(views)/(pages)/notifications/actions/notification-actions";

import { Button } from "@/miz/themes/react/components/button/page";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/miz/components/react/dialog/page";

export default function NotificationDetailsDialog({
  notification,
  onRead,
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(notification.status);
  const [loading, setLoading] = useState(false);

  const handleOpenChange = async (isOpen) => {
    setOpen(isOpen);

    // فقط هنگام باز شدن دیالوگ و خوانده‌نشده بودن اعلان
    if (isOpen && status === "UNREAD" && !loading) {
      setLoading(true);

      try {
        const result = await markNotificationAsRead(notification.id);

        console.log("MARK AS READ RESULT:", result);

        if (result.success) {
          setStatus("READ");

          // اطلاع به صفحه والد برای به‌روزرسانی جدول
          onRead?.(notification.id);
        } else {
          console.error(
            "MARK NOTIFICATION AS READ FAILED:",
            result.message
          );
        }
      } catch (error) {
        console.error("MARK NOTIFICATION AS READ ERROR:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="default"
        className="txt-size-small font-weight-regular"
        onClick={() => handleOpenChange(true)}
      >
        مشاهده جزئیات
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="w-35">

          <div className="d-flex flex-column gap-3">
            <div>
              <p className="font-weight-bold">{notification.title}</p>
            </div>

            <div>
              <p>{notification.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
