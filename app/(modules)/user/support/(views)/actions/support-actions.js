
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/authentication/auth";
import prismaDB from "@/lib/prisma/prismaDB.js";

// دریافت تیکت‌های کاربر واردشده
export async function getUserTickets() {
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

    const tickets = await prismaDB.ticket.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        ticketNumber: true,
        title: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      tickets,
    };
  } catch (error) {
    console.error("GET_USER_TICKETS_ERROR:", error);

    return {
      success: false,
      message: "دریافت تیکت‌ها با خطا مواجه شد.",
      tickets: [],
    };
  }
}

// ایجاد تیکت جدید
export async function createTicket(formData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "برای ثبت تیکت ابتدا وارد حساب کاربری شوید.",
      };
    }

    // اعتبارسنجی اطلاعات
    const title = formData?.title?.trim();
    const description = formData?.description?.trim();

    if (!title || !description) {
      return {
        success: false,
        message: "عنوان و توضیحات تیکت را وارد کنید.",
      };
    }

    if (title.length > 150) {
      return {
        success: false,
        message: "عنوان تیکت نباید بیشتر از ۱۵۰ کاراکتر باشد.",
      };
    }

    if (description.length > 1000) {
      return {
        success: false,
        message: "توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد.",
      };
    }

    // ثبت تیکت
    const ticket = await prismaDB.$transaction(async (tx) => {
      // ایجاد تیکت
      const newTicket = await tx.ticket.create({
        data: {
          title,
          description,
          userId: session.user.id,
        },
        select: {
          id: true,
          ticketNumber: true,
          title: true,
          status: true,
          createdAt: true,
        },
      });

      // ثبت توضیحات به‌عنوان اولین پیام کاربر
      await tx.ticketMessage.create({
        data: {
          content: description,
          ticketId: newTicket.id,
          senderId: session.user.id,
        },
      });

      return newTicket;
    });
    return {
      success: true,
      message: "تیکت شما با موفقیت ثبت شد.",
      ticket,
    };
  } catch (error) {
    console.error("CREATE_TICKET_ERROR:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "ثبت تیکت با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
    };
  }
}

// دریافت جزئیات یک تیکت و پیام‌های آن
export async function getTicketDetails(ticketId) {
  
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

    if (!ticketId || typeof ticketId !== "string") {
      return {
        success: false,
        message: "شناسه تیکت معتبر نیست.",
      };
    }

    const ticket = await prismaDB.ticket.findFirst({
      where: {
        id: ticketId,
        userId: session.user.id,
      },
      select: {
        id: true,
        ticketNumber: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            content: true,
            senderId: true,
            createdAt: true,
            sender: {
              select: {
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
        message: "تیکت موردنظر پیدا نشد یا به آن دسترسی ندارید.",
      };
    }

    const messages = ticket.messages.map((message) => ({
      id: message.id,
      content: message.content,
      sender:
        message.senderId === session.user.id ? "user" : "admin",
      senderName: message.sender.name,
      time: message.createdAt,
    }));

    return {
      success: true,
      ticket: {
        id: ticket.id,
        ticketNumber: ticket.ticketNumber,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        createdAt: ticket.createdAt,
      },
      messages,
    };
  } catch (error) {
    console.error("GET_TICKET_DETAILS_ERROR:", error);

    return {
      success: false,
      message: "دریافت جزئیات تیکت با خطا مواجه شد.",
    };
  }
}

// ارسال پیام در یک تیکت
export async function sendTicketMessage(ticketId, content) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "برای ارسال پیام ابتدا وارد حساب کاربری شوید.",
      };
    }

    if (!ticketId || typeof ticketId !== "string") {
      return {
        success: false,
        message: "شناسه تیکت معتبر نیست.",
      };
    }

    if (typeof content !== "string" || !content.trim()) {
      return {
        success: false,
        message: "متن پیام را وارد کنید.",
      };
    }

    const trimmedContent = content.trim();

    if (trimmedContent.length > 2000) {
      return {
        success: false,
        message: "متن پیام نباید بیشتر از ۲۰۰۰ کاراکتر باشد.",
      };
    }

    // فقط تیکت متعلق به کاربر و باز قابل پاسخ‌گویی است
    const ticket = await prismaDB.ticket.findFirst({
      where: {
        id: ticketId,
        userId: session.user.id,
        status: {
          not: "CLOSED",
        },
      },
      select: {
        id: true,
      },
    });

    if (!ticket) {
      return {
        success: false,
        message:
          "تیکت موردنظر پیدا نشد، بسته شده یا به آن دسترسی ندارید.",
      };
    }

    const message = await prismaDB.ticketMessage.create({
      data: {
        content: trimmedContent,
        ticketId: ticket.id,
        senderId: session.user.id,
      },
      select: {
        id: true,
        content: true,
        senderId: true,
        createdAt: true,
        sender: {
          select: {
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
        sender: "user",
        senderName: message.sender.name,
        time: message.createdAt,
      },
    };
  } catch (error) {
    console.error("SEND_TICKET_MESSAGE_ERROR:", error);

    return {
      success: false,
      message: "ارسال پیام با خطا مواجه شد.",
    };
  }
}
