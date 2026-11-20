"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

import {
  getTicketDetails,
  sendTicketMessage,
} from "@/app/(modules)/user/support/(views)/actions/support-actions";

import TicketInfo from "./TicketInfo";
import TicketConversation from "./TicketConversation";

function formatTime(date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function TicketDetails({ ticketId }) {
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTicket() {
      try {
        setLoading(true);
        setError("");

        const result = await getTicketDetails(ticketId);

        if (!result.success) {
          setError(result.message);
          return;
        }

        setTicket(result.ticket);

        setMessages(
          result.messages.map((message) => ({
            ...message,
            time: formatTime(message.time),
          }))
        );
      } catch (error) {
        console.error("LOAD_TICKET_ERROR:", error);
        setError("دریافت اطلاعات تیکت با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    }

    loadTicket();
  }, [ticketId]);

  async function handleSendMessage(content) {
    try {
      const result = await sendTicketMessage(ticketId, content);

      if (!result.success) {
        return {
          success: false,
          message: result.message,
        };
      }

      const newMessage = {
        ...result.message,
        time: formatTime(result.message.time),
      };

      setMessages((prev) => [...prev, newMessage]);

      return {
        success: true,
      };
    } catch (error) {
      console.error("SEND_MESSAGE_ERROR:", error);

      return {
        success: false,
        message: "ارسال پیام با خطا مواجه شد.",
      };
    }
  }

  if (loading) {
    return (
      <div className="ticket-details-page p-8">
        در حال دریافت اطلاعات تیکت...
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="ticket-details-page p-8 d-flex flex-column gap-4">
        <p className="ticket-error" role="alert">
          {error || "تیکت موردنظر پیدا نشد."}
        </p>

        <Link
          href="/user/support/ticket-tables"
          className="ticket-back-link"
        >
          بازگشت به فهرست تیکت‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="ticket-details-page d-flex py-6 px-10 flex-column w-100">
      <div className="ticket-page-header primary-color d-flex align-items-center justify-content-space-between">
        <h1 className="font-weight-bold txt-size-high-title">
          جزئیات تیکت
        </h1>

        <Link
          href="/user/support/ticket-tables"
          className="ticket-back-link font-weight-bold d-flex align-items-center gap-2 txt-size-normal"
        >
          بازگشت
          <MoveLeft size={20} />
        </Link>
      </div>

      <div className="ticket-details-layout d-grid align-items-start gap-4">
        <TicketInfo ticket={ticket} />

        <TicketConversation
          messages={messages}
          onSendMessage={handleSendMessage}
          disabled={ticket.status === "CLOSED"}
        />
      </div>
    </div>
  );
}

export default TicketDetails;