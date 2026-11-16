"use client";

import { useState } from "react";
import { Button } from "@/miz/themes/react/components/button/page";
import { Send } from "lucide-react";

function TicketReply({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || sending || disabled) return;

    setSending(true);
    setError("");

    try {
      const result = await onSendMessage(trimmedMessage);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setMessage("");
    } catch (error) {
      console.error("TICKET_REPLY_ERROR:", error);
      setError("ارسال پیام با خطا مواجه شد.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      className="ticket-reply position-sticky bottom-0"
      onSubmit={handleSubmit}
    >
      <textarea
        className="ticket-reply-input"
        placeholder={
          disabled
            ? "این تیکت بسته شده است."
            : "نوشتن پاسخ..."
        }
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setError("");
        }}
        rows={1}
        maxLength={2000}
        disabled={disabled || sending}
      />

      <Button
        type="submit"
        size="icon"
        disabled={disabled || sending || !message.trim()}
        aria-label="ارسال پاسخ"
      >
        <Send size={18} />
      </Button>

      {error && (
        <p className="ticket-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default TicketReply;