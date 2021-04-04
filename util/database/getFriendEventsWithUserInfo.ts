import connection from "./connection";
import { CalendarEventsWithUserInfo } from "../../types/database";

export async function getFriendEventsWithUserInfo(nextAuthAccessToken: string): Promise<Array<CalendarEventsWithUserInfo>> {
    const results: Array<CalendarEventsWithUserInfo> = (
        await connection.query(
            "SET @user_id := (SELECT user_id FROM sessions WHERE (session_token = ? OR access_token = ?)); \
            SELECT ce.*, int_users.id AS user_id, int_users.username AS username, u.image AS image \
            FROM int_users \
            INNER JOIN int_user_relationships AS rel \
                ON (int_users.id = rel.main AND rel.main = @user_id) \
                OR (int_users.id = rel.secondary AND rel.main = @user_id) \
            INNER JOIN user_events AS ue \
                ON (ue.user_id = int_users.id) \
            INNER JOIN calendar_events as ce \
                ON ce.id = ue.event_id \
            INNER JOIN users AS u \
	            ON u.id = int_users.id",
            [nextAuthAccessToken, nextAuthAccessToken]
        )
    )[1];

    await connection.end();

    return results;
}