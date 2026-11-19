
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/miz/components/react/button/page";
import { toast } from "@/miz/components/react/toast/page";

import { deleteProject } from "../actions/crud";

export default function CellActions({ cellData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;

    const confirmed = window.confirm(
      "آیا از حذف این طرح مطمئن هستید؟"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await deleteProject(cellData.id);

      if (!res?.ok) {
        throw new Error(res?.message || "حذف پروژه ناموفق بود.");
      }

      toast.add({
        title: res.message,
      });

      router.refresh();
    } catch (error) {
      toast.add({
        title: error.message || "خطا در حذف پروژه",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Link href={`/userdashboard/projects/${cellData.id}`}>
        <Button variant="success">
          مشاهده جزئیات
        </Button>
      </Link>

      <Button
        variant="destructive"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "در حال حذف..." : "حذف"}
      </Button>
    </div>
  );
}
