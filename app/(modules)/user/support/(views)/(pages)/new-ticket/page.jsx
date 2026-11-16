
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/miz/themes/react/components/card/page";

import { NewTicketForm } from "./components/new-ticket-form";

import "../../../assets/css/support.css";

export default function NewTicketPage() {
  return (
    <div className="new-ticket-page p-8 d-flex flex-column gap-4 bg-on-primary-color">
      <div className="new-ticket-header d-flex align-items-center justify-content-space-between primary-color ">
        <h1 className="txt-size-high-title font-weight-bold">ثبت تیکت جدید</h1>

        <Link
          href="/user/support"
          className="new-ticket-back font-weight-bold primary-color d-flex align-items-center gap-2 txt-size-normal"
        >
          بازگشت
          <ArrowLeft size={20} />
        </Link>
      </div>

      <Card className="new-ticket-card bw-1 border-style-solid border-color ">
        <CardContent>
          <NewTicketForm />
        </CardContent>
      </Card>
    </div>
  );
}
