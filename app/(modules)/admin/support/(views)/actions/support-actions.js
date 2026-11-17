
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/authentication/auth";
import prismaDB from "@/lib/prisma/prismaDB.js";

// دریافت فهرست تیکت‌ها برای پنل ادمین
export async function getAdminTickets() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "ابتدا وارد حساب کاربری شوید.",
        tickets: [],
      };
    }

    // بررسی دسترسی ادمین
    if (session.user.role !== "admin") {
      return {
        success: false,
        message: "شما دسترسی لازم را ندارید.",
        tickets: [],
      };
    }

    const tickets = await prismaDB.ticket.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const formattedTickets = tickets.map((ticket) => ({
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      title: ticket.title,
      userName: ticket.user.name,
      createdAt: ticket.createdAt,
      status: ticket.status,
    }));

    return {
      success: true,
      tickets: formattedTickets,
    };
  } catch (error) {
    console.error("GET_ADMIN_TICKETS_ERROR:", error);

    return {
      success: false,
      message: "دریافت تیکت‌ها با خطا مواجه شد.",
      tickets: [],
    };
  }
}



export async function getAdminTicketDetails(ticketId) {
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

    if (session.user.role !== "admin") {
      return {
        success: false,
        message: "شما دسترسی لازم را ندارید.",
      };
    }

    if (!ticketId || typeof ticketId !== "string") {
      return {
        success: false,
        message: "شناسه تیکت معتبر نیست.",
      };
    }

    const ticket = await prismaDB.ticket.findUnique({
      where: {
        id: ticketId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!ticket) {
      return {
        success: false,
        message: "تیکت موردنظر پیدا نشد.",
      };
    }

    return {
      success: true,
      ticket: {
        id: ticket.id,
        ticketNumber: ticket.ticketNumber,
        title: ticket.title,
        description: ticket.description,
        userId: ticket.userId,
        userName: ticket.user.name,
        status: ticket.status,
        createdAt: ticket.createdAt,
        messages: ticket.messages.map((message) => ({
          id: message.id,
          content: message.content,
          senderId: message.senderId,
          sender: message.senderId === ticket.userId ? "user" : "admin",
          senderName: message.sender.name,
          createdAt: message.createdAt,
        })),
      },
    };
  } catch (error) {
    console.error("GET_ADMIN_TICKET_DETAILS_ERROR:", error);

    return {
      success: false,
      message: "دریافت جزئیات تیکت با خطا مواجه شد.",
    };
  }
}


export async function sendAdminTicketMessage(ticketId, content) {
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

    if (session.user.role !== "admin") {
      return {
        success: false,
        message: "شما دسترسی لازم را ندارید.",
      };
    }

    if (
      !ticketId ||
      typeof ticketId !== "string" ||
      !content ||
      typeof content !== "string"
    ) {
      return {
        success: false,
        message: "اطلاعات پیام معتبر نیست.",
      };
    }

    const trimmedContent = content.trim();

    if (!trimmedContent || trimmedContent.length > 2000) {
      return {
        success: false,
        message: "متن پیام باید بین ۱ تا ۲۰۰۰ کاراکتر باشد.",
      };
    }

    const ticket = await prismaDB.ticket.findUnique({
      where: { id: ticketId },
      select: {
        id: true,
        status: true,
      },
    });

    if (!ticket) {
      return {
        success: false,
        message: "تیکت موردنظر پیدا نشد.",
      };
    }

    if (ticket.status === "CLOSED") {
      return {
        success: false,
        message: "این تیکت بسته شده است.",
      };
    }

    const message = await prismaDB.ticketMessage.create({
      data: {
        content: trimmedContent,
        ticketId: ticket.id,
        senderId: session.user.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      success: true,
      message: {
        id: message.id,
        content: message.content,
        sender: "admin",
        senderName: message.sender.name,
        createdAt: message.createdAt,
      },
    };
  } catch (error) {
    console.error("SEND_ADMIN_TICKET_MESSAGE_ERROR:", error);

    return {
      success: false,
      message: "ارسال پاسخ با خطا مواجه شد.",
    };
  }
}
