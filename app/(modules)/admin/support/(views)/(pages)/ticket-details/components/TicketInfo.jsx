
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/miz/themes/react/components/card/page";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/miz/themes/react/components/select/page";

function TicketInfo({ ticket, onStatusChange }) {
  return (
    <Card className="ticket-info-card py-6 px-8 font-weight-bold d-flex flex-column bw-1 border-style-solid border-color gap-4">
      <CardHeader className="ticket-info-header bw-1 border-color bb-style-solid pb-3">
        <CardTitle className="primary-color txt-size-mid-title font-weight-bold">
          اطلاعات تیکت
        </CardTitle>
      </CardHeader>

      <CardContent className="ticket-info-content gap-4 d-flex flex-column">
        <div className="ticket-info-item d-flex flex-column gap-2">
          <span className="txt-size-normal font-weight-medium text-color">
            نام کاربر:
          </span>

          <strong className="font-weight-semi-bold txt-size-title">
            {ticket.userName}
          </strong>
        </div>

        <div className="ticket-info-item d-flex flex-column gap-2">
          <span className="txt-size-normal font-weight-medium text-color">
            زمان درخواست:
          </span>

          <strong className="font-weight-semi-bold txt-size-title">
            {ticket.createdAt}
          </strong>
        </div>

        <div className="ticket-info-item d-flex flex-column gap-2">
          <span className="txt-size-normal font-weight-medium text-color">
            تغییر وضعیت:
          </span>

          <Select
            value={ticket.status}
            onValueChange={onStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب وضعیت" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="UNDER_REVIEW">
                در حال بررسی
              </SelectItem>

              <SelectItem value="ANSWERED">
                پاسخ داده شده
              </SelectItem>

              <SelectItem value="CLOSED">
                بسته شده
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default TicketInfo;
