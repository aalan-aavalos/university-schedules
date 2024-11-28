
import React, { useEffect, useState } from "react";

import { getAllSubjectsByCareerIdAndFourMonthPeriod } from "@/custom-graphql/queries";
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";

interface SubjectByStudent {
  id: string;
  subject_name: string;
  hours_per_student: number;
  schedule: string | null;
  teacherID: string;
}

import { type FetchUserAttributesOutput } from "aws-amplify/auth";

import { CalendarComponent } from "@/components/views/student/Calendar";

const ScheduleStudent = ({
  user,
}: {
  user: FetchUserAttributesOutput | null;
}) => {
  const [subjects, setSubjects] = useState<Array<SubjectByStudent>>([]);

  const { showLoading, hideLoading, LoadingBackdrop } = useLoadingBackdrop();

  useEffect(() => {
    const excuteQuieries = async () => {
      try {
        showLoading();
        if (!user) return;

        const { "custom:career": career, "custom:four_month_period": fmp } =
          user;
        const careerID = career as string;
        if (!fmp) return;
        const res = await getAllSubjectsByCareerIdAndFourMonthPeriod(
          careerID,
          +fmp
        );
        setSubjects(res);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    excuteQuieries();
  }, [user, hideLoading, showLoading]);

  console.log(subjects);
  return (
    <div>
      {LoadingBackdrop}
      <CalendarComponent subjects={subjects} idUsr={user?.sub}/>
    </div>
  );
};

export { ScheduleStudent };
