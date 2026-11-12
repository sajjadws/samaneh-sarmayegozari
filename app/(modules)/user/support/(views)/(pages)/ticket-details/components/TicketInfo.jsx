import { Card, CardHeader, CardTitle, CardContent } from "@/miz/themes/react/components/card/page";
import {Badge} from "@/miz/themes/react/components/badge/page";

function TicketInfo({ ticket }) {
  return (
    <Card className="ticket-info-card py-6 px-8 font-weight-bold d-flex flex-column bw-1 border-style-solid border-color gap-4">
      <CardHeader className="ticket-info-header bw-1 border-color bb-style-solid pb-3">
        <CardTitle className="primary-color txt-size-mid-title font-weight-bold">عنوان تیکت</CardTitle>
      </CardHeader>

      <CardContent className="ticket-info-content gap-4 d-flex flex-column">
        <div className="ticket-info-item d-flex flex-column gap-2">
          <span className="txt-size-normal font-weight-medium text-color">شناسه تیکت:</span>
          <strong className="font-weight-semi-bold txt-size-title txt-wrap-nowrap">{ticket.id}</strong>
        </div>

        <div className="ticket-info-item d-flex flex-column gap-2">
          <span className="txt-size-normal font-weight-medium text-color">زمان درخواست:</span>
          <strong className="font-weight-semi-bold txt-size-title txt-wrap-nowrap">{ticket.createdAt}</strong>
        </div>

        <div className="ticket-info-item">
          <span className="txt-size-normal font-weight-medium text-color">وضعیت:</span>
          <Badge status={ticket.status} />
        </div>
      </CardContent>
    </Card>
  );
}
export default TicketInfo;