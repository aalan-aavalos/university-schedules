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
// import { updateScheduleStudent } from "@/custom-graphql/mutations";
import { enqueueSnackbar } from "notistack";
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";
import ScheduleRestrictions from "./restrictions/ScheduleRestrictions";

// Clases
import { ScheduleValidator } from "@/models/scheduleValidator";
import { ScheduleUpdater } from "@/models/scheduleUpdater";
import { ScheduleSummary } from "@/models/scheduleSummary";
import { AutoArrangeService } from "@/models/autoArrangeService";

// Interfcaes
import { ConfigProps, EventProps, ValidationProps } from "@/interfaces";

import { useConfirm } from "material-ui-confirm";

const localizer = momentLocalizer(moment);

interface SubjectByStudent {
  id: string;
  subject_name: string;
  hours_per_student: number;
  schedule: string | null;
  teacherID: string;
}

const initialConfig: ConfigProps = {
  restrictionOne: { hoursMin: 8, hoursMax: 14, autoArrage: true },
  restrictionTwo: {
    hoursMaxPerDay: 5,
    hoursMaxPerWeek: 25,
    autoArrage: true,
  },
};

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

  const [config, setConfig] = useState<ConfigProps>(initialConfig);

  const { LoadingBackdrop, hideLoading, showLoading } = useLoadingBackdrop();

  const confirm = useConfirm();

  class FacadeSave {
    private scheduleValidator: ScheduleValidator;
    private scheduleSummary: ScheduleSummary;
    private autoArrangeService: AutoArrangeService;
    private scheduleUpdater: ScheduleUpdater;

    constructor(
      idUsr: string,
      myEvents: Array<EventProps>,
      config: ConfigProps
    ) {
      this.scheduleValidator = new ScheduleValidator(myEvents, config);
      this.scheduleSummary = new ScheduleSummary();
      this.scheduleUpdater = new ScheduleUpdater(idUsr);
      this.autoArrangeService = new AutoArrangeService(config);
    }

    public async save(): Promise<void> {
      const validations: ValidationProps =
        this.scheduleValidator.getValidations();
      console.log("validations", validations);

      const adjustedSchedule =
        this.autoArrangeService.autoArrangeSchedule(validations);
      console.log("adjustedSchedule", adjustedSchedule);

      const summary =
        this.scheduleSummary.generateInvalidSubjectsReport(validations);
      console.log("summary", summary);

      await confirm({
        description: summary,
        title: "Resumen de Materias Inválidas",
        confirmationText: "Siguiente",
        hideCancelButton: true,
      });

      const updatedSchedule = adjustedSchedule.AllEvents;

      await this.scheduleUpdater.updateSchedule(updatedSchedule);

      enqueueSnackbar("Horario actualizado correctamente", {
        variant: "success",
      });
    }
  }

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
      console.log(itemInfo, id);

      const end = new Date(
        (typeof item.end === "string"
          ? new Date(item.end)
          : item.end
        ).getTime() +
          30 * 60 * 1000
      );
      console.log(item);
      const event = {
        id: id + Math.random(),
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
      const id = idUsr as string;

      const facedeSave = new FacadeSave(id, myEvents, config);

      facedeSave.save();
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
      <h4>Materias a cursar</h4>
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

      {/* Contenedor para alinear los botones */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Button variant="contained" onClick={saveSchedule}>
          Guardar Calendario
        </Button>
        <Button>
          <ScheduleRestrictions onChange={setConfig} />
        </Button>
      </div>
    </>
  );
};

export { CalendarComponent };
