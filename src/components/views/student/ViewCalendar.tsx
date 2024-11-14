import React, { useEffect } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface EventProps {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
}

const CalendarComponent = ({ events }: { events: EventProps[] }) => {
  useEffect(() => {}, [events]);

  return (
    <>
      <div className="height600">
        <Calendar
          defaultView="week"
          views={["week"]}
          toolbar={false}
          events={events}
          localizer={localizer}
          style={{ height: "80vh", width: "70vw" }}
          
        />
      </div>
    </>
  );
};

export { CalendarComponent };
