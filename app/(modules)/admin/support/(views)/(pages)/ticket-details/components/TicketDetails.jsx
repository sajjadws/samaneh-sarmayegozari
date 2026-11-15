
"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

import TicketInfo from "./TicketInfo";
import TicketConversation from "./TicketConversation";
import { TicketStatusBadge } from "@/miz/themes/react/components/ticket-status-badge/page";

// داده نمایشی؛ بعداً با اطلاعات واقعی تیکت جایگزین می‌شود.
const initialTicket = {
  id: "TK-001",
  title: "مشکل در عملیات واریز وجه",
  userName: "علی رضایی",
  createdAt: "1405/01/01",
  status: "UNDER_REVIEW",
  messages: [
    {
      id: 1,
      sender: "admin",
      senderName: "مدیر سیستم",
      content: "لطفاً اطلاعات مربوط به درخواست خود را ارسال کنید.",
      time: "4 روز پیش",
    },
    {
      id: 2,
      sender: "user",
      senderName: "کاربر",
      content: "هنگام ثبت درخواست با خطا مواجه می‌شوم.",
      time: "2 روز پیش",
    },
    {
      id: 3,
      sender: "user",
      senderName: "کاربر",
      content: "هنگام ثبت درخواست با خطا مواجه می‌شوم.",
      time: "2 روز پیش",
    },
  ],
};

function TicketDetails() {
  const [ticket, setTicket] = useState(initialTicket);
  const [messages, setMessages] = useState(initialTicket.messages);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      sender: "admin",
      senderName: "مدیر سیستم",
      content,
      time: "همین الان",
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleStatusChange = (status) => {
    setTicket((prev) => ({
      ...prev,
      status,
    }));
  };

  return (
    <div className="ticket-details-page d-flex py-6 px-10 flex-column w-100 gap-4">
      <div className="ticket-page-header primary-color d-flex align-items-center justify-content-space-between">
        <div>
          <h1 className="font-weight-bold txt-size-high-title">
            جزئیات تیکت
          </h1>
          <p>مشاهده پیام‌ها و مدیریت درخواست کاربران</p>
        </div>

        <Link
          href="/madoles/admin/support"
          className="ticket-back-link font-weight-bold d-flex align-items-center gap-2 txt-size-normal"
        >
          بازگشت
          <MoveLeft size={20} />
        </Link>
      </div>

      <div className="ticket-summary d-flex align-items-center justify-content-space-between p-4 bw-1 border-color border-style-solid radius-all-normal">
        <div>
          <h2 className="font-weight-bold txt-size-title">
            {ticket.title}
          </h2>

          <span className="txt-size-small">
            شناسه تیکت: {ticket.id}
          </span>
        </div>

        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="ticket-details-layout d-grid align-items-start gap-4">
        <TicketInfo
          ticket={ticket}
          onStatusChange={handleStatusChange}
        />

        <TicketConversation
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default TicketDetails;
