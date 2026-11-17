
"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/miz/themes/react/components/card/page";

import { DataTable } from "@/miz/themes/react/components/data-table/data-table";

import { ArrowLeft } from "lucide-react";

import { notificationColumns } from "@/app/(modules)/user/support/(views)/(pages)/notifications/components/notification-columns";

import "../../../assets/css/support.css";

import { useEffect, useState } from "react";
import { getUserNotifications } from "./actions/notification-actions";
import "../../../assets/css/support.css";



export default function NotificationsPage() {

  const [notifications, setNotifications] = useState([]);
  

    useEffect(() => {
      async function fetchNotifications() {
        const result = await getUserNotifications();

        console.log("Notifications result:", result);

        if (result.success) {
          setNotifications(result.notifications);
        }
      }

    fetchNotifications();
  }, []);

  return (
    <div className="support-page p-6 px-8">
      {/* هدر صفحه */}
      <div className="support-page-header d-flex align-items-center justify-content-space-between ">
        <div>
          <h1 className="font-weight-bold txt-size-high-title primary-dark-color ">
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
