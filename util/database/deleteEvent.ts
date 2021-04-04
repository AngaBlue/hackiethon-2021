import connection from "./connection";
import { getUserID } from "./getUserID";
export function deleteEvent(nextAuthAccessToken: string, eventId: number): Promise<void> {
    // TODO: Change this to accept an event ID
    // Check if event ID has mapping to user ID
    // If so, remove mapping and check if any further mappings to that event ID exist
    // If none, then delete event
    // Otherwise, event should remain in db as it's being used by other users

    const userId = getUserID(nextAuthAccessToken);

    connection.query(
        "DELETE FROM user_events WHERE event_id = 1 AND user_id = 18; \
        DELETE FROM calendar_events WHERE id = 1 and (SELECT COUNT(*) FROM user_events WHERE event_id = 1) = 0;",
        [eventId, userId, eventId, eventId]
    );
    return;
}
