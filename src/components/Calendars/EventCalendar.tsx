import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { EventSourceInput } from "@fullcalendar/core/index.js";

function EventCalendar(props: {
  calendarData: EventSourceInput;
  initialDate: Date | string;
}) {
  const { calendarData, initialDate } = props;

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={false}
      initialView="dayGridMonth"
      initialDate={initialDate}
      contentHeight="600"
      events={calendarData}
      editable={true}
      height="100%"
    />
  );
}

export default EventCalendar;
