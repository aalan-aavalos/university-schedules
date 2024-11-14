import React, { DragEvent, useCallback, useEffect, useState } from "react";

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

  const [itemsList, setItemsList] = useState<JSX.Element[]>([]);

  const handleDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>, item: SubjectByTeacherProps) => {
      event.dataTransfer.dropEffect = "none";
      setItemInfo(item);
    },
    []
  );

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    // Queda el error que no se comprueba si si se ingreso, para que no lo borre

    const id = event.currentTarget.id;
    const [subject, hrs] = event.currentTarget.innerText.split(" - ");
    const [hr] = hrs.split(" ");

    const div = document.getElementById(id);
    if (+hr < 2 && div) {
      div.remove();
      return;
    }
    if (!div) return;

    div.innerText = `${subject} - ${+hr - 1} hrs`;

    console.log(div);
  };

  const newEvent = useCallback(
    (event: unknown) => {
      console.log("newEvent on...", event);

      const e = event as EventProps;
      setMyEvents((prev) => [...prev, { ...e }]);
    },
    [setMyEvents]
  );

  const onDropFromOutside = useCallback(
    (item: DragFromOutsideItemArgs) => {
      console.log("onDropFromOutside on...", item);

      if (!itemInfo) return;
      const { id, subject_name } = itemInfo;

      const end = new Date(
        (typeof item.end === "string"
          ? new Date(item.end)
          : item.end
        ).getTime() +
          30 * 60 * 1000
      );
      console.log(item);
      const event = {
        id,
        title: subject_name,
        start: new Date(item.start),
        end,
        isAllDay: false,
      };

      newEvent(event);
    },
    [newEvent, itemInfo]
  );

  useEffect(() => {
    if (!subjects) return;
    const itemsLi = subjects.map((item) => (
      <div
        id={`${item.subject_name}: ${item.hours_per_teacher}`}
        key={item.id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, item)}
        onDragEnd={(e) => handleDragEnd(e)}
        className="bg-[#3174ad] text-white border border-[#121212] rounded-lg p-1 cursor-move"
      >
        {`${item.subject_name} - ${item.hours_per_teacher} hrs`}
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
          onDragOver={(event) => event.preventDefault()}
          defaultView="week"
          views={["week"]}
          toolbar={false}
          draggableAccessor={() => true}
          events={myEvents}
          localizer={localizer}
          onDropFromOutside={(e: DragFromOutsideItemArgs) =>
            onDropFromOutside(e)
          }
          onSelectSlot={(e: SlotInfo) => newEvent(e)}
          resizable
          style={{ height: 500, width: "70vw" }}
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
