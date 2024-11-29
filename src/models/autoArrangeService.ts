import { ConfigProps, ValidationProps, EventProps } from "@/interfaces";


export class AutoArrangeService {
    private config: ConfigProps;

    constructor(config: ConfigProps) {
        this.config = config;
    }

    public autoArrangeSchedule(schedule: ValidationProps): ValidationProps {
        // Filtramos los eventos que cumplen las restricciones
        const validEvents = schedule.AllEvents.filter(event => this.isValidEvent(event, schedule));

        // Devolvemos el calendario ajustado
        return {
            AllEvents: validEvents,
            brokeValidateDailyWeeklyLimits: [],
            brokeValidateTimeRange: []
        };
    }

    private isValidEvent(event: EventProps, schedule: ValidationProps): boolean {
        // Verificar si el evento cumple con las restricciones de tiempo (restricción uno)
        if (event.brokenRule === "Time Range" && !this.isValidTimeRange(event)) {
            return false;
        }

        // Verificar si el evento cumple con las restricciones de horas por día (restricción dos)
        if (event.brokenRule === "Daily Limit" && !this.isValidDailyLimit(event, schedule)) {
            return false;
        }

        return true;
    }

    private isValidTimeRange(event: EventProps): boolean {
        const { hoursMin, hoursMax } = this.config.restrictionOne;
        const eventStartHour = new Date(event.start).getHours();

        // Verificar si el evento empieza dentro del rango permitido
        if (eventStartHour < hoursMin || eventStartHour > hoursMax) {
            return false;
        }

        return true;
    }

    private isValidDailyLimit(event: EventProps, schedule: ValidationProps): boolean {
        const { hoursMaxPerDay } = this.config.restrictionTwo;

        // Contamos cuántas horas ya están programadas para el mismo día
        const dayStart = new Date(event.start).toDateString();
        const totalHoursToday = schedule.AllEvents
            .filter(e => new Date(e.start).toDateString() === dayStart)
            .reduce((total, e) => total + (new Date(e.end).getHours() - new Date(e.start).getHours()), 0);

        // Verificamos si el total de horas excede el límite diario
        if (totalHoursToday + (new Date(event.end).getHours() - new Date(event.start).getHours()) > hoursMaxPerDay) {
            return false;
        }

        return true;
    }
}
