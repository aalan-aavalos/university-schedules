import React, { useEffect, useState } from "react";
import { CalendarComponent } from "@/components/Calendar";
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";
import { getAllSubjectsByTeacherID } from "@/custom-graphql/queries";

interface SubjectByTeacherProps {
  id: string;
  subject_name: string;
  schedule?: string | null;
  four_month_period: number;
  hours_per_teacher: number;
  hours_per_student: number;
}

const ScheduleTeacher = ({ teacharID }: { teacharID: string | undefined }) => {
  const [subjects, setSubjects] = useState<Array<SubjectByTeacherProps>>([]);

  const { showLoading, hideLoading, LoadingBackdrop } = useLoadingBackdrop();

  useEffect(() => {
    const excuteQuieries = async () => {
      try {
        showLoading();
        if (!teacharID) return;
        const res = await getAllSubjectsByTeacherID(teacharID);
        setSubjects(res);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    excuteQuieries();
  }, [hideLoading, showLoading, teacharID]);

  return (
    <div>
      {LoadingBackdrop}
      <CalendarComponent subjects={subjects} />
    </div>
  );
};

export { ScheduleTeacher };
