import React, { useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configurar el localizador con Moment.js
const localizer = momentLocalizer(moment);

// Extiende el calendario con la funcionalidad de Drag and Drop
const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Cumpleaños karina",
      start: new Date("2024-10-19 00:00"),
      end: new Date("2024-10-19 23:59"),
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
    ({ event, start, end }) => {
      const updatedEvent = { ...event, start, end };

      // Actualiza el estado con el evento movido
      setEvents((prevEvents) =>
        prevEvents.map((evt) => (evt.id === event.id ? updatedEvent : evt))
      );
    },
    [setEvents]
  );

  const newEvent = useCallback(
    (event) => {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: prevEvents.length + 1, ...event },
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
        startAccessor="start"
        endAccessor="end"
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
