import React, { useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer, Views, SlotInfo } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop, { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configurar el localizador con Moment.js
const localizer = momentLocalizer(moment);

// Extiende el calendario con la funcionalidad de Drag and Drop
const DragAndDropCalendar = withDragAndDrop(Calendar);

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const CalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Cumpleaños Karina",
      start: new Date("2024-10-19T00:00:00"),
      end: new Date("2024-10-19T23:59:59"),
    },
    {
      id: 2,
      title: "Llamada con cliente",
      start: new Date(2024, 9, 30, 14, 0),
      end: new Date(2024, 9, 30, 15, 0),
    },
  ]);

  // Función para mover eventos
  const moveEvent = useCallback(
    ({ event, start, end }: EventInteractionArgs<object>) => {
      const updatedEvent = {
        ...(event as CalendarEvent),
        start: new Date(start),
        end: new Date(end),
      };

      // Actualiza el estado con el evento movido
      setEvents((prevEvents) =>
        prevEvents.map((evt) => (evt.id === (event as CalendarEvent).id ? updatedEvent : evt))
      );
    },
    [setEvents]
  );

  // Añadir nuevos eventos
  const newEvent = useCallback(
    (slotInfo: SlotInfo) => {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: prevEvents.length + 1,
          title: "Nuevo Evento",
          start: new Date(slotInfo.start),
          end: new Date(slotInfo.end),
        },
      ]);
    },
    [setEvents]
  );

  const defaultDate = useMemo(() => new Date(2024, 9, 1), []);

  return (
    <div style={{ height: "600px" }}>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        startAccessor={(event) => (event as CalendarEvent).start}
        endAccessor={(event) => (event as CalendarEvent).end}
        style={{ height: 500, margin: "50px" }}
        onEventDrop={moveEvent} // Permite arrastrar eventos dentro del calendario
        onSelectSlot={newEvent} // Permite añadir nuevos eventos
        selectable
        resizable
      />
    </div>
  );
};

export default CalendarComponent;
