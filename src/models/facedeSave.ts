// Clases
import { ScheduleValidator } from '@/models/scheduleValidator';
import { ScheduleUpdater } from '@/models/scheduleUpdater';
import { ScheduleSummary } from '@/models/scheduleSummary';

// Interfcaes
import { ConfigProps, EventProps, ValidationProps } from '@/interfaces';


export class FacadeSave {
    private scheduleValidator: ScheduleValidator
    private scheduleSummary: ScheduleSummary
    private scheduleUpdater: ScheduleUpdater

    constructor(idUsr: string, myEvents: Array<EventProps>, config: ConfigProps) {
        this.scheduleValidator = new ScheduleValidator(myEvents, config)

        this.scheduleSummary = new ScheduleSummary()

        this.scheduleUpdater = new ScheduleUpdater(idUsr)
    }

    public save(): void {
        const validations: ValidationProps = this.scheduleValidator.getValidations()
        console.log("validations", validations)

        const summary: string = this.scheduleSummary.generateInvalidSubjectsReport(validations)
        console.log("summary", summary);
        // this.scheduleUpdater.updateSchedule(this.myEvents)

    }
}