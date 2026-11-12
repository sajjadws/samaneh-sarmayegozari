"use client";

import { useState } from "react";
import { Modal } from "@/miz/components/react/modal/page";
import { Button } from "@/miz/components/react/button/page";
import CreateForm from "./create-form";

const CreateModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>افزودن پست</Button>
      <Modal open={open} onOpenChange={setOpen} title="افزودن پست">
        <div className="flex flex-col gap-2">
          <CreateForm onComplete={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  );
};

export default CreateModal;
