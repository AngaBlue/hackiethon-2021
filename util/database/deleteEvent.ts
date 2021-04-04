import { Dayjs } from "dayjs";

export function deleteEvent(nextAuthAccessToken: string, startTime: Dayjs, endTime: Dayjs): void {
    // TODO: Change this to accept an event ID
    // Check if event ID has mapping to user ID
    // If so, remove mapping and check if any further mappings to that event ID exist
    // If none, then delete event
    // Otherwise, event should remain in db as it's being used by other users
    console.error("deleteEvent function is incomplete");
    return;
}
