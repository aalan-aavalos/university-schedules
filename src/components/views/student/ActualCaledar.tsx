import { CalendarComponent } from "@/components/views/student/ViewCalendar";
import { useLoadingBackdrop } from "@/hooks/useLoadingBackdrop";
import { FetchUserAttributesOutput } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";

interface EventProps {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
}

const ActualCaledar = ({
  user,
}: {
  user: FetchUserAttributesOutput | null;
}) => {
  const [events, setEvents] = useState<Array<EventProps>>([]);

  const { showLoading, hideLoading, LoadingBackdrop } = useLoadingBackdrop();

  useEffect(() => {
    const excuteQuieries = async () => {
      try {
        showLoading();
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    excuteQuieries();
  }, [user, hideLoading, showLoading]);

  useEffect(() => {}, []);
  return (
    <div>
      {LoadingBackdrop}
      <CalendarComponent events={events} />
    </div>
  );
};

export { ActualCaledar };
