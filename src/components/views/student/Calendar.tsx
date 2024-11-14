import React, { DragEvent, useCallback, useEffect, useState } from "react";

import { Calendar, momentLocalizer, type SlotInfo } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop, {
  type DragFromOutsideItemArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
const DragAndDropCalendar = withDragAndDrop(Calendar);

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@mui/material";
import { updateScheduleStudent } from "@/custom-graphql/mutations";
import { enqueueSnackbar } from "notistack";
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";

const localizer = momentLocalizer(moment);

interface SubjectByStudent {
  id: string;
  subject_name: string;
  hours_per_student: number;
  schedule: string | null;
  teacherID: string;
}

interface EventProps {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
}

const CalendarComponent = ({
  subjects,
  idUsr,
}: {
  subjects: SubjectByStudent[];
  idUsr: string | undefined;
}) => {
  const [myEvents, setMyEvents] = useState<Array<EventProps>>([]);

  const [itemInfo, setItemInfo] = useState<SubjectByStudent>();

  const [itemsList, setItemsList] = useState<JSX.Element[]>([]);

  const { LoadingBackdrop, hideLoading, showLoading } = useLoadingBackdrop();

  const handleDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>, item: SubjectByStudent) => {
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

  const saveSchedule = async () => {
    try {
      showLoading();
      console.log("Eventos en el calendario:", JSON.stringify(myEvents));
      const schedules = JSON.stringify(myEvents);
      const id = idUsr as string;
      await updateScheduleStudent(id, schedules);

      const message = "Horario actualizado correctamente";
      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      const message = "Algo salio mal al actualizar el horario";
      enqueueSnackbar(message, { variant: "error" });
      console.error(err);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (!subjects) return;
    const itemsLi = subjects.map((item) => (
      <div
        id={`${item.subject_name}: ${item.hours_per_student}`}
        key={item.id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, item)}
        onDragEnd={(e) => handleDragEnd(e)}
        className="bg-[#3174ad] text-white border border-[#121212] rounded-lg p-1 cursor-move"
      >
        {`${item.subject_name} - ${item.hours_per_student} hrs`}
      </div>
    ));
    setItemsList(itemsLi);
  }, [handleDragStart, subjects]);

  return (
    <>
      {LoadingBackdrop}
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
          style={{ height: "70vh", width: "70vw" }}
        />
      </div>

      <Button variant="contained" sx={{ my: 1 }} onClick={saveSchedule}>
        Guardar Calendario
      </Button>
    </>
  );
};

export { CalendarComponent };
