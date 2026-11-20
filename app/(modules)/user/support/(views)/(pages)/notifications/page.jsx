
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/miz/themes/react/components/card/page";

import { DataTable } from "@/miz/themes/react/components/data-table/data-table";

import { getNotificationColumns } from "./components/notification-columns";
import { getUserNotifications } from "./actions/notification-actions";

import "../../../assets/css/support.css";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      const result = await getUserNotifications();

      if (result.success) {
        setNotifications(result.notifications);
      }
    }

    fetchNotifications();
  }, []);

  // به‌روزرسانی وضعیت اعلان در جدول
  const handleNotificationRead = (notificationId) => {
    console.log("NOTIFICATION READ:", notificationId);

    setNotifications((prevNotifications) => {
      const updatedNotifications = prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, status: "READ" }
          : notification
      );

      console.log("UPDATED NOTIFICATIONS:", updatedNotifications);

      return updatedNotifications;
    });
  };

  return (
    <div className="support-page p-6 px-8">
      <div className="support-page-header d-flex align-items-center justify-content-space-between">
        <div>
          <h1 className="font-weight-bold txt-size-high-title primary-dark-color">
            اعلان‌ها
          </h1>

          <p>مشاهده و مدیریت اعلان‌های حساب کاربری</p>
        </div>

        <Link
          href="/madoles/admin/support"
          className="new-ticket-back font-weight-bold primary-color d-flex align-items-center gap-2 txt-size-normal"
        >
          بازگشت
          <ArrowLeft size={20} />
        </Link>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={getNotificationColumns(handleNotificationRead)}
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
