
"use client";

import { useState } from "react";
import "./NotificationDropdown.css";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuGroup,
} from "@/miz/themes/react/components/dropdown-menu/page";

import "@/public/css/miz.min.css";
import { Button } from "@/miz/themes/react/components/button/page";
import { MoveLeftIcon } from "lucide-react";

export default function NotificationDropdown() {
    const [notifications, setNotifications] = useState([
    {
        id: 1,
        title: "سفارش جدید",
        message: "یک سفارش جدید ثبت شده است.",
        is_read: false,
        created_at: "۲ دقیقه پیش",
    },
    {
        id: 2,
        title: "پیام جدید",
        message: "یک پیام جدید دریطلاعات شما به‌روزرسانی شطلاعات شما به‌روزرسانی شافت کرده‌اید.",
        is_read: false,
        created_at: "۱۰ دقیقه پیش",
    },
    {
        id: 3,
        title: "به‌روزرسانی سیستم",
        message: "اطلاعات شما به‌روزرسانی شد.",
        is_read: true,
        created_at: "یک ساعت پیش",
    },
    {
        id: 4,
        title: "به‌روزرسانی سیستم",
        message: "اطلاعات شما به‌روزرسانی شطلاعات شما به‌روزرسانی شطلاعات شما به‌روزرسانی شطلاعات شما به‌روزرسانی شطلاعات شما به‌روزرسانی شد.",
        is_read: true,
        created_at: "یک ساعت پیش",
    },
    {
        id: 5,
        title: "به‌روزرسانی سیستم",
        message: "اطلاعات شما به‌روزرسانی شد.",
        is_read: true,
        created_at: "یک ساعت پیش",
    },
    ]);

    const unreadCount = notifications.filter(
        (notification) => !notification.is_read
    ).length;

    function handleReadNotification(notificationId) {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === notificationId
                    ? { ...item, is_read: true }
                    : item
            )
        );
    }

    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="position-relative">
                <i className="icon icon-notification txt-size-mid-title"></i>

                {unreadCount > 0 && (
                    <span className="badge bg-danger-regular-color aspect-ratio-1x1 radius-all-full h-50 d-flex justify-content-center align-items-center txt-size-small white-color position-absolute top-0 inset-start-0">
                        {unreadCount}
                    </span>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="d-flex flex-column gap-2 p-8 radius-all-normal bg-card-color py-3 px-5 border-color bw-1 border-style-solid">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="py-3 border-color bw-1 bb-style-solid primary-color font-weight-medium txt-size-normal">
                        اعلان‌ها
                    </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {notifications.length === 0 ? (
                    <DropdownMenuItem disabled>
                        اعلانی وجود ندارد
                    </DropdownMenuItem>
                ) : (
                    notifications.map((notification) => (
                        <DropdownMenuItem
                            className={`p-3 radius-all-small d-flex flex-column border-color bw-1 border-style-solid  ${
                                !notification.is_read
                                    ? "bg-on-primary-color"
                                    : "bg-card-color"
                            }`}
                            key={notification.id}
                            onClick={() =>
                                handleReadNotification(notification.id)
                            }
                        >
                            <div className="d-flex flex-column gap-1 w-100">
                                <div className="d-flex justify-content-space-between align-items-center primary-color font-weight-regular">
                                    <strong className="">{notification.title}</strong>
                                </div>

                                <span className="text-color txt-size-small font-weight-regular">{notification.message}</span>

                                <small className="text-color txt-size-small font-weight-regular">
                                    {notification.created_at}
                                </small>
                            </div>
                        </DropdownMenuItem>
                    ))
                )}
                <Button className="py-2">
                    مشاهده همه اعلان ها
                    <MoveLeftIcon />
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
