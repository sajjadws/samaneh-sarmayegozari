import { useState } from "react";
import { Modal } from "@/miz/components/react/modal/page";
import { Button } from "@/miz/components/react/button/page";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import CreateForm from "./create-form";
import { toast } from "@/miz/components/react/toast/page";
import { deleteProject } from "../actions/crud";
import Link from "next/link";
import { routes } from "@/lib/routes/routes";

export default function CellActions({ cellData }) {
  const [open, setOpen] = useState(false);
  const [dOpen, setDOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteProject(cellData?.id);
    if (res?.ok) {
      toast.add({
        title: res?.message,
      });
      setDOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Button size="icon" onClick={() => setOpen(true)}>
          <IconEdit />
        </Button>
        <Button size="icon" variant="destructive" onClick={() => setDOpen(true)}>
          <IconTrash />
        </Button>
        <Link href={routes.panel.post(cellData?.id)}>
          <Button size="icon" variant="success">
            <IconEye />
          </Button>
        </Link>
      </div>
      <Modal open={open} onOpenChange={setOpen}>
        <CreateForm
          id={cellData?.id}
          initialData={{ fullName: cellData?.fullName, phoneNumber: cellData?.phoneNumber }}
          onComplete={() => setOpen(false)}
        />
      </Modal>
      <Modal open={dOpen} onOpenChange={setDOpen}>
        <div className="flex flex-col gap-2">
          <p>
            آیا از حذف کاربر <span className="text-destructive">{cellData?.fullName || cellData?.phoneNumber}</span>{" "}
            مطمئن هستید؟
          </p>
          <hr className="my-2" />
          <div className="flex gap-2">
            <Button onClick={handleDelete}>تایید</Button>
            <Button variant="destructive" onClick={() => setDOpen(false)}>
              انصراف
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
