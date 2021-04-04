import { CalendarEvents } from "../../types/database";
import connection from "./connection";

export async function getUserEvents(nextAuthAccessToken: string): Promise<Array<CalendarEvents>> {
    const results: Array<CalendarEvents> = await connection.query(
        "SELECT ce.* FROM sessions as s \
        INNER JOIN user_events as ue \
            ON ue.user_id = s.user_id \
        INNER JOIN calendar_events as ce \
            ON (ce.id = ue.event_id AND ue.user_id = s.user_id) \
        WHERE (s.access_token = ? OR s.session_token = ?);",
        [nextAuthAccessToken, nextAuthAccessToken]
    );

    await connection.end();

    return results;
}
