import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configurar el localizador con Moment.js
const localizer = momentLocalizer(moment);

// Definimos nuestro componente de calendario
const CalendarComponent = () => {
  // Lista de eventos para mostrar en el calendario
  const events = [
    {
      title: "Cumpleaños karina",
      start: new Date("2024-10-19 00:00"),
      end: new Date("2024-10-19 23:59"),
    },
    {
      title: "Llamada con cliente",
      start: new Date(2024, 9, 30, 14, 0),
      end: new Date(2024, 9, 30, 15, 0),
    },
  ];

  return (
    <div style={{ height: "600px" }}>
      <h2>Calendario de Eventos</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default CalendarComponent;
