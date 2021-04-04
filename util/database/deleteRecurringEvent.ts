import { Dayjs } from "dayjs";

export function deleteRecurringEvent(
    nextAuthAccessToken: string,
    startTime: Dayjs,
    endTime: Dayjs,
    dayOfWeek: number
): void {
    // Same as deleteEvent but may change depending on how recurring events are stored in the DB
    console.error("deleteRecurringEvent function is incomplete");
    return;
}
