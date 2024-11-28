import { updateScheduleStudent } from "@/custom-graphql/mutations";
import { EventProps } from '@/interfaces';

export class ScheduleUpdater {
  private idUsr: string;

  constructor(idUsr: string) {
    this.idUsr = idUsr
  }

  // Método principal para actualizar el horario
  public async updateSchedule(myEvents: Array<EventProps>): Promise<void> {
    try {
      const schedules = JSON.stringify(myEvents)

      await updateScheduleStudent(this.idUsr, schedules);
    } catch (error) {
      console.error("Error in updateSchedule:", error);
    }
  }
}
