"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function PageHeader({ title, description }) {
  const router = useRouter();

  return (
    <section className="section flex-row justify-content-space-between align-items-end">
      <div>
        <h1 className="txt-size-mid-title font-weight-bold text-color">{title}</h1>
        <p className="txt-size-title secondary-text-color">{description}</p>
      </div>

      <div
        className="return-link d-flex align-items-center primary-color cursor-pointer gap-1"
        onClick={() => router.back()}
      >
        <span className="txt-size-normal user-select-none">بازگشت</span>
        <IconArrowLeft />
      </div>
    </section>
  );
}
