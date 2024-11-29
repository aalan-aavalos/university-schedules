import { EventProps, ConfigProps } from '@/interfaces';

export class ScheduleValidator {
    private schedule: Array<EventProps>;
    private config: ConfigProps;


    constructor(schedule: Array<EventProps>, config: ConfigProps) {
        this.schedule = schedule;
        this.config = config;
    }

    // Validar el rango de horas (validateTimeRange)
    private validateTimeRange(): Array<EventProps> {
        const { hoursMin, hoursMax } = this.config.restrictionOne;

        // Filtrar los eventos que están fuera del rango de horas permitido
        return this.schedule.filter(event => {
            const eventStartHour = event.start.getHours();
            const eventEndHour = event.end.getHours();

            const breaksMinHour = eventStartHour < hoursMin;
            const breaksMaxHour = eventEndHour > hoursMax;

            // Si rompe la hora mínima o la hora máxima
            return breaksMinHour || breaksMaxHour;
        }).map(event => ({ ...event, brokenRule: 'Time Range' }));
    }

    // Validar los límites de horas diarias y semanales (validateDailyWeeklyLimits)
    private validateDailyWeeklyLimits(): Array<EventProps> {
        const { hoursMaxPerDay } = this.config.restrictionTwo;

        // Para almacenar los eventos que rompen la restricción diaria
        const dailyLimitsBreaks: Array<EventProps> = [];

        // Agrupar los eventos por día
        const dailyGrouped = this.groupEventsByDay(this.schedule);

        // Validar cada día para ver si excede el límite de horas
        for (const day in dailyGrouped) {
            const dailyEvents = dailyGrouped[day];

            // Calcular las horas totales del día
            let totalDailyHours = 0;
            let lastEventBreakingLimit: EventProps | null = null;

            // Iterar sobre los eventos de ese día
            for (const event of dailyEvents) {
                const eventDuration = (event.end.getTime() - event.start.getTime()) / (1000 * 3600); // Duración en horas
                totalDailyHours += eventDuration;

                // Si el total de horas excede el límite, marcamos este evento
                if (totalDailyHours > hoursMaxPerDay) {
                    lastEventBreakingLimit = event; // Este es el evento que causa que se rompa la restricción
                }
            }

            // Si se superaron las horas por día, agregar el evento que causó la violación
            if (lastEventBreakingLimit) {
                dailyLimitsBreaks.push({
                    ...lastEventBreakingLimit,
                    brokenRule: 'Daily Limit'
                });
            }
        }

        return dailyLimitsBreaks;
    }

    // Helper function to group events by day (date)
    private groupEventsByDay(events: Array<EventProps>): { [key: string]: Array<EventProps> } {
        return events.reduce((acc, event) => {
            const eventDate = event.start.toDateString(); // Agrupar por fecha del evento
            if (!acc[eventDate]) {
                acc[eventDate] = [];
            }
            acc[eventDate].push(event);
            return acc;
        }, {} as { [key: string]: Array<EventProps> });
    }

    // Método que obtiene todas las validaciones y las organiza por tipo
    public getValidations(): { brokeValidateTimeRange: Array<EventProps>, brokeValidateDailyWeeklyLimits: Array<EventProps>, AllEvents: Array<EventProps> } {
        const brokeValidateTimeRange = this.validateTimeRange();
        const brokeValidateDailyWeeklyLimits = this.validateDailyWeeklyLimits();

        // Todos los eventos con el atributo adicional 'brokenRule' que indica la restricción rota
        const allEvents = [
            ...this.schedule.map(event => {
                const timeRangeBreak = brokeValidateTimeRange.find(e => e.id === event.id);
                const dailyWeeklyBreak = brokeValidateDailyWeeklyLimits.find(e => e.id === event.id);

                if (timeRangeBreak) {
                    return { ...event, brokenRule: 'Time Range' };
                } else if (dailyWeeklyBreak) {
                    return { ...event, brokenRule: 'Daily/Weekly Limit' };
                }
                return { ...event, brokenRule: 'None' }; // Evento sin restricciones rotas
            })
        ];

        return {
            brokeValidateTimeRange,
            brokeValidateDailyWeeklyLimits,
            AllEvents: allEvents
        };
    }
}
