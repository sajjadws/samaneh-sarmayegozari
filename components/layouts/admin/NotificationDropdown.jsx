
"use client";

import { useEffect, useState } from "react";
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
import { Check, MoveLeftIcon, Ticket } from "lucide-react";

import {
    getUserNotifications,
    markAllNotificationsAsRead,
} from "@/app/(modules)/user/support/(views)/(pages)/notifications/actions/notification-actions";
import Link from "next/link";

export default function NotificationDropdown() {
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

    const unreadCount = notifications.filter(
        (notification) => notification.status === "UNREAD"
    ).length;

    const [loading, setLoading] = useState(false);

    async function handleReadAll() {
        if (unreadCount === 0 || loading) return;

        setLoading(true);

        try {
            const result = await markAllNotificationsAsRead();

            if (result.success) {
                setNotifications((prev) =>
                    prev.map((notification) => ({
                        ...notification,
                        status: "READ",
                    }))
                );
            }
        } catch (error) {
            console.error("MARK_ALL_NOTIFICATIONS_ERROR:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="position-relative bg-on-primary-color">
                <i className="icon icon-notification txt-size-mid-title"></i>

                {unreadCount > 0 && (
                    <span className="badge bg-danger-regular-color aspect-ratio-1x1 radius-all-full h-50 d-flex justify-content-center align-items-center txt-size-small white-color position-absolute top-0 inset-start-0">
                        {unreadCount}
                    </span>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="d-flex flex-column gap-2 p-8 radius-all-normal bg-card-color py-3 px-5 border-color bw-1 border-style-solid"
            >
                <DropdownMenuGroup>
                    <div className="d-flex justify-content-space-between align-items-center w-100 border-color bw-1 bb-style-solid  ">
                        <DropdownMenuLabel className=" py-3  font-weight-medium txt-size-normal primary-dark-color">
                            اعلان‌ها
                        </DropdownMenuLabel>

                            <button
                                className="primary-color d-flex align-items-center bg-card-color txt-size-normal"
                                type="button"
                                disabled={unreadCount === 0 || loading}
                                onClick={handleReadAll}
                            >
                                خواندن همه
                                <Check size={20}/>
                            </button>
                    </div>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {notifications.length === 0 ? (
                    <DropdownMenuItem disabled>
                        اعلانی وجود ندارد
                    </DropdownMenuItem>
                ) : (
                    notifications.map((notification) => (
                        <DropdownMenuItem
                            className={`p-3 radius-all-small d-flex flex-column border-color bw-1 border-style-solid ${
                                notification.status === "UNREAD"
                                    ? "bg-on-primary-color"
                                    : "bg-card-color"
                            }`}
                            key={notification.id}
                        >
                            <div className="d-flex flex-column gap-1 w-100">
                                <strong className="primary-color">
                                    {notification.title}
                                </strong>

                                <span className="text-color txt-size-small">
                                    {notification.description}
                                </span>

                                <small className="text-color txt-size-small">
                                    {new Date(notification.createdAt).toLocaleString("fa-IR")}
                                </small>
                            </div>
                        </DropdownMenuItem>
                    ))
                )}

                <Link href="/user/support/notifications">
                    <Button className="py-2 w-100">
                        مشاهده همه اعلان‌ها
                        <MoveLeftIcon />
                    </Button>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
