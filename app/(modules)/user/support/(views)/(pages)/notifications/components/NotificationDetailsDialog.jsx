"use client";

import { useState } from "react";

import { Button } from "@/miz/themes/react/components/button/page";
import { Modal } from "@/miz/components/react/modal/page";

export default function NotificationDetailsDialog({ notification }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="default"
        className="txt-size-small font-weight-regular"
        onClick={() => setOpen(true)}
      >
        مشاهده جزئیات
      </Button>

      <Modal
        className=""
        open={open}
        onOpenChange={setOpen}
      >
        <div className="d-flex flex-column gap-8 bg-card-color p-8 radius-all-large w-35 ">
          <div>
            <p>{notification.title}</p>
          </div>

          <div>
            <p>{notification.description}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}