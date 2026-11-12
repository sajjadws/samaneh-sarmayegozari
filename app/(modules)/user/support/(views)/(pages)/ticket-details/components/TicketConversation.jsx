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
    <Card className="ticket-conversation-card w-100 bw-1 border-style-solid border-color">
      <CardHeader className="ticket-conversation-header bb-style-solid border-color bw-1 pb-3">
        <CardTitle className="primary-color txt-size-mid-title font-weight-bold">گفت‌وگو</CardTitle>
      </CardHeader>

      <CardContent className="ticket-conversation-content">
        <div className="ticket-messages-list d-flex flex-column gap-6">
          {messages.map((message) => (
            <TicketMessage
              className="w-fit-content"
              key={message.id}
              message={message}
            />
          ))}
        </div>

        <TicketReply onSendMessage={onSendMessage} />
      </CardContent>
    </Card>
  );
}

export default TicketConversation;