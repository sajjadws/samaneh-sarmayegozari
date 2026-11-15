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
        <Link href={"routes.panel.project(cellData?.id)"}>
          <Button variant="success">
            مشاهده جزئیات
          </Button>
        </Link>
      </div>
    
    </>
  );
}
