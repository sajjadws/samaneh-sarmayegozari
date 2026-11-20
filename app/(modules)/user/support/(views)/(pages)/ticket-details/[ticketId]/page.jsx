import TicketDetails from "./components/TicketDetails";
import "../../../../assets/css/support.css";

export default async function TicketDetailsPage({ params }) {
  const { ticketId } = await params;

  return <TicketDetails ticketId={ticketId} />;
}