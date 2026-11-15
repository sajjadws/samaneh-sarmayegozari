
"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/miz/themes/react/components/card/page";

import { DataTable } from "@/miz/themes/react/components/data-table/data-table";

import { ArrowLeft } from "lucide-react";

import { notificationColumns } from "./components/notification-columns";

import "../../../assets/css/support.css";

// داده‌های نمایشی اعلان‌های یک کاربر
const notifications = [
  {
    id: "1",
    title: "سرمایه‌گذاری با موفقیت ثبت شد",
    description: "سرمایه‌گذاری شما در طرح توسعه نیروگاه خورشیدی ثبت شد.",
    status: "UNREAD",
    createdAt: "2026-11-15T10:30:00",
  },
  {
    id: "2",
    title: "یادآوری سررسید",
    description: "زمان سررسید پرداخت بعدی شما نزدیک است.",
    status: "READ",
    createdAt: "2026-11-15T09:20:00",
  },
  {
    id: "3",
    title: "پاسخ پرسش شما ثبت شد",
    description: "پاسخ پرسش شما در بخش پشتیبانی قرار گرفت.",
    status: "READ",
    createdAt: "2026-11-15T08:15:00",
  },
];

export default function NotificationsPage() {
  return (
    <div className="support-page p-6 px-8">
      {/* هدر صفحه */}
      <div className="support-page-header d-flex align-items-center justify-content-space-between">
        <div>
          <h1 className="primary-color font-weight-bold txt-size-high-title">
            اعلان‌ها
          </h1>

          <p>
            مشاهده و مدیریت اعلان‌های حساب کاربری
          </p>
        </div>

        <Link
          href="/madoles/admin/support"
          className="new-ticket-back font-weight-bold primary-color d-flex align-items-center gap-2 txt-size-normal"
        >
          بازگشت
          <ArrowLeft size={20} />
        </Link>
      </div>

      {/* جدول اعلان‌ها */}
      <Card>
        <CardContent>
          <DataTable
            columns={notificationColumns}
            data={notifications}
            collectionName="اعلان"
            singleName="اعلان"
            emptyMessage="هنوز اعلانی برای شما ثبت نشده است."
          />
        </CardContent>
      </Card>
    </div>
  );
}
