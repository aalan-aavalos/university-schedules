import { CalendarComponent } from "@/components/views/student/ViewCalendar";
import { getSchedulesByUser } from "@/custom-graphql/queries";
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
        const id = user?.sub as string;
        const res = await getSchedulesByUser(id);

        if (!res) {
          setEvents([]);
          return;
        }

        const schedules = JSON.parse(res).map((item: EventProps) => {
          const start = new Date(item.start);
          const end = new Date(item.end);
          return { ...item, start, end };
        });

        console.log(typeof schedules, schedules);
        setEvents(schedules);
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
