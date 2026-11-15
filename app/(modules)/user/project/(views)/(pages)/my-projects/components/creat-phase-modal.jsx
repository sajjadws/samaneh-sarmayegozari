
"use client";

import { useState } from "react";
import { Modal } from "@/miz/components/react/modal/page";
import { Button } from "@/miz/components/react/button/page";
import CreateFormPhase from "./creat-form-phase";

const CreatePhaseModal = () => {
  const [open, setOpen] = useState(false);

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
          <CreateFormPhase />
        </div>
      </Modal>
    </>
  );
};

export default CreatePhaseModal;
