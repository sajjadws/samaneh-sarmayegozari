
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/authentication/auth";
import prismaDB from "@/lib/prisma/prismaDB.js";

// دریافت اعلان‌های کاربر واردشده
export async function getUserNotifications() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "ابتدا وارد حساب کاربری شوید.",
        notifications: [],
      };
    }

    const notifications = await prismaDB.notification.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      notifications,
    };
  } catch (error) {
    console.error("GET_USER_NOTIFICATIONS_ERROR:", error);

    return {
      success: false,
      message: "دریافت اعلان‌ها با خطا مواجه شد.",
      notifications: [],
    };
  }
}

// تغییر وضعیت اعلان به خوانده‌شده

export async function markNotificationAsRead(notificationId) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "ابتدا وارد حساب کاربری شوید.",
      };
    }

    if (!notificationId || typeof notificationId !== "string") {
      return {
        success: false,
        message: "شناسه اعلان معتبر نیست.",
      };
    }

    const result = await prismaDB.notification.updateMany({
      where: {
        id: notificationId,
        userId: session.user.id,
        status: "UNREAD",
      },
      data: {
        status: "READ",
      },
    });

    // اگر رکورد تغییر نکرده، بررسی می‌کنیم آیا قبلاً خوانده شده است.
    if (result.count === 0) {
      const notification = await prismaDB.notification.findFirst({
        where: {
          id: notificationId,
          userId: session.user.id,
        },
        select: {
          status: true,
        },
      });

      if (!notification) {
        return {
          success: false,
          message: "اعلان موردنظر پیدا نشد.",
        };
      }

      return {
        success: notification.status === "READ",
        status: notification.status,
      };
    }

    return {
      success: true,
      status: "READ",
    };
  } catch (error) {
    console.error("MARK_NOTIFICATION_AS_READ_ERROR:", error);

    return {
      success: false,
      message: "تغییر وضعیت اعلان با خطا مواجه شد.",
    };
  }
}



// خوانده‌شده کردن تمام اعلان‌های خوانده‌نشده کاربر
export async function markAllNotificationsAsRead() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "ابتدا وارد حساب کاربری شوید.",
      };
    }

    const result = await prismaDB.notification.updateMany({
      where: {
        userId: session.user.id,
        status: "UNREAD",
      },
      data: {
        status: "READ",
      },
    });

    return {
      success: true,
      count: result.count,
      message: "تمام اعلان‌ها خوانده شدند.",
    };
  } catch (error) {
    console.error("MARK_ALL_NOTIFICATIONS_AS_READ_ERROR:", error);

    return {
      success: false,
      message: "تغییر وضعیت اعلان‌ها با خطا مواجه شد.",
    };
  }
}
