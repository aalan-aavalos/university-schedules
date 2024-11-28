// Clases
import { ConfigService } from '@/models/configService';
import { ScheduleValidator } from '@/models/scheduleValidator';
import { ScheduleUpdater } from '@/models/updateSchedule';

// Interfcaes
import { ConfigProps, EventProps } from '@/interfaces';

export class FacadeSave {
    private configService: ConfigService
    private scheduleValidator: ScheduleValidator
    private scheduleUpdater: ScheduleUpdater

    private myEvents: Array<EventProps>

    constructor(idUsr: string, myEvents: Array<EventProps>, config: ConfigProps) {
        this.myEvents = myEvents

        this.scheduleUpdater = new ScheduleUpdater(idUsr)
        this.scheduleValidator = new ScheduleValidator(this.myEvents, config)
        this.configService = new ConfigService(config)
    }

    public save(): void {
        console.log(this.scheduleValidator.getValidations())
        // this.scheduleUpdater.updateSchedule(this.myEvents)
        console.log("si jalaron las clases pa");
    }
}