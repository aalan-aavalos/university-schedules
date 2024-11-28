import React from "react";
import { ScheduleRestrictions } from "./restrictions/ScheduleRestrictions";

const ScheduleStudent = () => {
  return (
    <div>
      <h1>Horario del estudiante</h1>
      <ScheduleRestrictions />
    </div>
  );
};

export { ScheduleStudent };
