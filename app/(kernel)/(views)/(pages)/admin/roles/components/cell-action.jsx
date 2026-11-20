"use client";

import Link from "next/link";
import { Button } from "@/miz/themes/react/components/button/page";

export default function CellAction({ cellData }) {
    return (
        <div className="align-items-center flex gap-2">
            <Link href={`/admin/roles/show/${cellData.id}`}>
                <Button>مشاهده دسترسی‌ها</Button>
            </Link>
            <Link href={`/admin/roles/edit/${cellData.id}`}>
                <Button variant="outline">ویرایش دسترسی‌ها</Button>
            </Link>
        </div>
    );
}
