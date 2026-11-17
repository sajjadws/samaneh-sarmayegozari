
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

import TicketInfo from "./TicketInfo";
import TicketConversation from "./TicketConversation";
import { TicketStatusBadge } from "@/miz/themes/react/components/ticket-status-badge/page";
import { useParams } from "next/navigation";
import { getAdminTicketDetails } from "@/app/(modules)/admin/support/(views)/actions/support-actions";
import { sendAdminTicketMessage } from "@/app/(modules)/admin/support/(views)/actions/support-actions";

function TicketDetails() {
  const params = useParams();

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const result = await getAdminTicketDetails(params.id);

        if (result.success) {
          setTicket(result.ticket);
          setMessages(result.ticket.messages);
        } else {
          console.error("GET_ADMIN_TICKET_DETAILS:", result.message);
        }
      } catch (error) {
        console.error("FETCH_ADMIN_TICKET_ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchTicket();
    }
  }, [params.id]);

  if (loading) {
    return <div className="p-6">در حال دریافت اطلاعات تیکت...</div>;
  }

  if (!ticket) {
    return <div className="p-6">تیکت موردنظر پیدا نشد.</div>;
  }
  const handleSendMessage = async (content) => {
    try {
      const result = await sendAdminTicketMessage(
        ticket.id,
        content
      );

      if (!result.success) {
        console.error("SEND_ADMIN_MESSAGE_ERROR:", result.message);
        alert(result.message);
        return false;
      }

      setMessages((prev) => [...prev, result.message]);

      return true;
    } catch (error) {
      console.error("SEND_ADMIN_MESSAGE_ERROR:", error);
      alert("ارسال پاسخ با خطا مواجه شد.");
      return false;
    }
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
