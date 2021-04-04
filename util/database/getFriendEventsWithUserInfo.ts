import { CalendarEventsWithUserInfo } from "../../types/database";
import connection from "./connection";

export async function getFriendEventsWithUserInfo(
    nextAuthAccessToken: string
): Promise<Array<CalendarEventsWithUserInfo>> {
    const results: Array<CalendarEventsWithUserInfo> = (
        await connection.query(
            "SET @user_id := (SELECT user_id FROM sessions WHERE (session_token = ? OR access_token = ?)); \
            SET time_zone = '+00:00'; \
            SELECT ce.*, friend_user.id AS user_id, friend_user.username AS username, u.image AS image \
            FROM int_users AS starting_user \
            INNER JOIN int_user_relationships AS rel \
                ON (starting_user.id = rel.main AND rel.main = @user_id) \
                OR (starting_user.id = rel.secondary AND rel.secondary = @user_id) \
            INNER JOIN user_events AS ue \
                ON ue.user_id = (CASE \
                    WHEN rel.main = @user_id THEN rel.secondary \
                    WHEN rel.secondary = @user_id THEN rel.main \
                END) \
            INNER JOIN calendar_events as ce \
                ON ce.id = ue.event_id \
            INNER JOIN users AS u \
                ON u.id = ue.user_id \
            INNER JOIN int_users AS friend_user \
                ON friend_user.id = u.id;",
            [nextAuthAccessToken, nextAuthAccessToken]
        )
    );

    await connection.end();

    return results[2];
}
