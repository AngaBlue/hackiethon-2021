import { CalendarEvents } from "../../types/database";
import connection from "./connection";

export async function getFriendEvents(nextAuthAccessToken: string): Promise<Array<CalendarEvents>> {
    const results: Array<CalendarEvents> = (
        await connection.query(
            "SET @user_id := (SELECT user_id FROM sessions WHERE (session_token = ? OR access_token = ?)); \
            SELECT ce.*, int_users.* \
            FROM int_users \
            INNER JOIN int_user_relationships AS rel \
                ON (int_users.id = rel.main AND rel.main = @user_id) \
                OR (int_users.id = rel.secondary AND rel.main = @user_id) \
            INNER JOIN user_events AS ue \
                ON (ue.user_id = int_users.id) \
            INNER JOIN calendar_events as ce \
                ON ce.id = ue.event_id",
            [nextAuthAccessToken, nextAuthAccessToken]
        )
    )[1];

    await connection.end();

    return results;
}
