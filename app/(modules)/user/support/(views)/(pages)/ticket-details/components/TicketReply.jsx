"use client";

import { useState } from "react";
import { Button } from "@/miz/themes/react/components/button/page";
import { Send } from "lucide-react";

function TicketReply({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    onSendMessage(trimmedMessage);
    setMessage("");
  };

  return (
    <form
      className="ticket-reply position-sticky bottom-0"
      onSubmit={handleSubmit}
    >
      <textarea
        className="ticket-reply-input"
        placeholder="نوشتن پاسخ..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={1}
      />

      <Button
        type="submit"
        size="icon"
        disabled={!message.trim()}
        aria-label="ارسال پاسخ"
      >
        <Send size={18} />
      </Button>
    </form>
  );
}

export default TicketReply;