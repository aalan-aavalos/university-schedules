import { ValidationProps } from '@/interfaces';

export class ScheduleSummary {
    public generateInvalidSubjectsReport(schedule: ValidationProps): string {
        console.log(schedule);

        // Verifica si no hay eventos para generar el reporte
        if (!schedule || !schedule.AllEvents || schedule.AllEvents.length === 0) {
            return 'No hay eventos para mostrar.';
        }

        // Iniciar la cadena de texto que contendrá el reporte
        let textReport = 'Materias inválidas:\n';

        // Verifica si hay eventos que rompieron la restricción de rango de tiempo
        if (schedule.brokeValidateTimeRange.length > 0) {
            textReport += 'Eventos que rompieron la validación de horario:\n';
            schedule.brokeValidateTimeRange.forEach((event) => {
                // Formatear la fecha de inicio a un formato más legible
                const startDate = new Date(event.start).toLocaleString();
                textReport += `- ${event.title} (Inicio: ${startDate}) - Regla rota: ${event.brokenRule || 'Desconocida'}\n`;
            });
        }

        // Verifica si hay eventos que rompieron la restricción diaria/semanal
        if (schedule.brokeValidateDailyWeeklyLimits.length > 0) {
            textReport += 'Eventos que rompieron la validación diaria/semanal:\n';
            schedule.brokeValidateDailyWeeklyLimits.forEach((event) => {
                // Formatear la fecha de inicio a un formato más legible
                const startDate = new Date(event.start).toLocaleString();
                textReport += `- ${event.title} (Inicio: ${startDate}) - Regla rota: ${event.brokenRule || 'Desconocida'}\n`;
            });
        }

        // Si no se rompieron reglas, añadir un mensaje
        if (schedule.brokeValidateTimeRange.length === 0 && schedule.brokeValidateDailyWeeklyLimits.length === 0) {
            textReport += 'No se han encontrado eventos con reglas rotas.\n';
        }

        return textReport;
    }
}
