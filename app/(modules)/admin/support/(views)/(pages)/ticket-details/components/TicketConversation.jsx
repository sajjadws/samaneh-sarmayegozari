
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/miz/themes/react/components/card/page";

import TicketMessage from "./TicketMessage";
import TicketReply from "./TicketReply";

function TicketConversation({ messages, onSendMessage }) {
  return (
    <Card className="ticket-conversation-card w-100 bw-1 border-style-solid border-color position-relative h-50vh">
      <CardHeader className="ticket-conversation-header bb-style-solid border-color bw-1 pb-3">
        <CardTitle className="primary-color txt-size-mid-title font-weight-bold">
          گفت‌وگو و پاسخ
        </CardTitle>
      </CardHeader>

      <CardContent className="ticket-conversation-content p-2 overflow-scroll">
        <div className="ticket-messages-list d-flex flex-column gap-4">
          {messages.map((message) => (
            <TicketMessage
              key={message.id}
              message={message}
            />
          ))}
        </div>
      </CardContent>

      <TicketReply onSendMessage={onSendMessage} />
    </Card>
  );
}

export default TicketConversation;
