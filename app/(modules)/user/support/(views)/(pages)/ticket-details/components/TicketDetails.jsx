"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

import TicketInfo from "./TicketInfo";
import TicketConversation from "./TicketConversation";
import { ticketData } from "../../../../database/ticketData";

function TicketDetails() {
  const [messages, setMessages] = useState(ticketData.messages);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      sender: "user",
      senderName: "کاربر",
      content,
      time: "همین الان",
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="ticket-details-page d-flex py-6 px-10 flex-column gap-5 w-100" >
      <div className="ticket-page-header primary-color d-flex align-items-center justify-content-space-between">
        <h1 className="font-weight-bold txt-size-high-title">جزئیات تیکت</h1>

        <Link
          href="/support/tickets"
          className="ticket-back-link font-weight-bold d-flex align-items-center gap-2 txt-size-normal"
        >
          بازگشت
          <MoveLeft size={20} />
        </Link>
      </div>

      <div className="ticket-details-layout d-grid align-items-start gap-4">
        <TicketInfo ticket={ticketData} />
        <TicketConversation
          messages={messages}
          onSendMessage={handleSendMessage}
        />

        
      </div>
    </div>
  );
}

export default TicketDetails;