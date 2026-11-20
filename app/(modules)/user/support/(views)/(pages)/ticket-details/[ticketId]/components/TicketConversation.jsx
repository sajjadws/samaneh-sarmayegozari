import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/miz/themes/react/components/card/page";

import TicketMessage from "./TicketMessage";
import TicketReply from "./TicketReply";

function TicketConversation({ messages, onSendMessage, disabled }) {
  return (
    <Card className="ticket-conversation-card w-100 bw-1 border-style-solid border-color p-2 position-relative h-75vh ">
      <CardHeader className="ticket-conversation-header bb-style-solid border-color bw-1 pb-3">
        <CardTitle className="primary-color txt-size-mid-title font-weight-bold">
          گفت‌وگو
        </CardTitle>
      </CardHeader>

      <CardContent className="ticket-conversation-content p-2 overflow-y-scroll h-100">
        <div className="ticket-messages-list d-flex flex-column gap-4">
          {messages.map((message) => (
            <TicketMessage key={message.id} message={message} />
          ))}
        </div>
      </CardContent>

      <TicketReply
        onSendMessage={onSendMessage}
        disabled={disabled}
      />
    </Card>
  );
}

export default TicketConversation;