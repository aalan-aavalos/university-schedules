export interface ConfigProps {
    restrictionOne: {
        hoursMin: number;
        hoursMax: number;
        autoArrage: boolean
    }
    restrictionTwo: {
        hoursMaxPerDay: number;
        hoursMaxPerWeek: number;
        autoArrage: boolean
    }
}

export interface EventProps {
    id: string;
    title: string;
    start: Date;
    end: Date;
    isAllDay: boolean;
    brokenRule?: string
}
