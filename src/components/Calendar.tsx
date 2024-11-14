import React, { useCallback, useEffect, useState } from "react";

import { Calendar, momentLocalizer, type SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, {
  type DragFromOutsideItemArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
const DragAndDropCalendar = withDragAndDrop(Calendar);

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface SubjectByTeacherProps {
  id: string;
  subject_name: string;
  schedule?: string | null;
  four_month_period: number;
  hours_per_teacher: number;
  hours_per_student: number;
}

interface EventProps {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
}

export default function DnDOutsideResource({
  subjects,
}: {
  subjects: SubjectByTeacherProps[];
}) {
  const [myEvents, setMyEvents] = useState<Array<EventProps>>([]);

  const [itemInfo, setItemInfo] = useState<SubjectByTeacherProps>();

  const [itemsList, setItemsList] = useState<React.JSX.Element[]>([]);

  const handleDragStart = useCallback((event: SubjectByTeacherProps) => {
    console.log("handleDragStart on...", event);

    // setDraggedEvent(event);
    setItemInfo(event);
  }, []);

  /* const dragFromOutsideItem = useCallback(
    (event) => {
      console.log("dragFromOutsideItem on...", event);
      return draggedEvent === "undroppable" ? null : draggedEvent;
    },
    [draggedEvent]
  ); */

  /* const customOnDragOverFromOutside = useCallback(
    (dragEvent) => {
      console.log("customOnDragOverFromOutside on...?", dragEvent);

      if (draggedEvent !== "undroppable") {
        console.log("customOnDragOverFromOutside on...", dragEvent);
        dragEvent.preventDefault();
      }
    },
    [draggedEvent]
  ); */

  const generateRandomId = () => Math.random().toString(36).substring(2, 15);

  /* const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      console.log("moveEvent on...", {
        event,
        start,
        end,
        isAllDay: (droppedOnAllDaySlot = false),
      });
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      setMyEvents((prev) => {
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...event, start, end, allDay }];
      });
    },
    [setMyEvents]
  ); */

  const newEvent = useCallback(
    (event: SlotInfo) => {
      console.log("newEvent on...", event);

      // const e = event as EventProps;
      setMyEvents((prev) => [...prev, { ...event }]);
    },
    [setMyEvents]
  );

  const onDropFromOutside = useCallback(
    (item: DragFromOutsideItemArgs) => {
      console.log("onDropFromOutside on...", item);

      if (!itemInfo) return;
      const { subject_name } = itemInfo;

      const end = new Date(
        (typeof item.end === "string"
          ? new Date(item.end)
          : item.end
        ).getTime() +
          30 * 60 * 1000
      );
      console.log(item);
      const event = {
        id: generateRandomId(),
        title: subject_name,
        start: new Date(item.start),
        end,
        isAllDay: false,
      };

      newEvent(event);
    },
    [newEvent, itemInfo]
  );

  /* const resizeEvent = useCallback(
    ({ event, start, end }) => {
      console.log("resizeEvent", { event, start, end });
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  ); */

  useEffect(() => {
    if (!subjects) return;
    const itemsLi = subjects.map((item) => (
      <div
        key={item.id}
        draggable="true"
        onDragStart={() => handleDragStart(item)}
        className="bg-[#3174ad] text-white border border-[#121212] rounded-lg p-1 cursor-move"
      >
        {`${item.subject_name} - ${item.hours_per_teacher}hrs`}
      </div>
    ));
    setItemsList(itemsLi);
  }, [handleDragStart, subjects]);

  return (
    <>
      <h4>Materias</h4>
      <div className="py-1 flex gap-2" id="drag-items">
        {itemsList}
      </div>

      <div className="height600">
        <DragAndDropCalendar
          defaultView="week"
          views={["week"]}
          toolbar={false}
          // dragFromOutsideItem={dragFromOutsideItem}
          draggableAccessor={() => true}
          // eventPropGetter={eventPropGetter}
          events={myEvents}
          localizer={localizer}
          onDropFromOutside={(e: DragFromOutsideItemArgs) =>
            onDropFromOutside(e)
          }
          // onDragOverFromOutside={customOnDragOverFromOutside}
          // onEventDrop={moveEvent}
          // onEventResize={resizeEvent}
          onSelectSlot={(e: SlotInfo) => newEvent(e)}
          resizable
          style={{ height: 500, width: "70vw" }}
          // selectable
        />
      </div>

      <button
        onClick={() => {
          console.log("Eventos en el calendario:", myEvents);
        }}
      >
        obtener eventos
      </button>
    </>
  );
}
