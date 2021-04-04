import { Dayjs } from "dayjs";

export default function createRecurringEvent(
    nextAuthAccessToken: string,
    startTime: Dayjs,
    endTime: Dayjs,
    dayOfWeek: number
): void {
    // Needs database schema update
    // Create new event with recurring flag set to true and specified repeat frequency
    // Maybe roll into createEvent with mandatory recurring boolean parameter?
    console.error("createRecurringEvent function is incomplete");
    return;
}
