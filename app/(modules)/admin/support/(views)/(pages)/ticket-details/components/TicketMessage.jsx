
import {
  Message,
  MessageContent,
  MessageHeader,
  MessageFooter,
} from "@/miz/themes/react/components/message/page";

function TicketMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <Message
      align={isUser ? "end" : "start"}
      className={`ticket-message ${
        isUser ? "ticket-message-user" : "ticket-message-admin"
      }`}
    >
      <MessageContent className="ticket-message-content">
        <MessageHeader className="ticket-message-header">
          {message.senderName}
        </MessageHeader>

        <p className="ticket-message-text">
          {message.content}
        </p>

        <MessageFooter className="ticket-message-footer">
          {message.time}
        </MessageFooter>
      </MessageContent>
    </Message>
  );
}

export default TicketMessage;
