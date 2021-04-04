import connection from "./connection";
import { Friend } from "./getUserFriends";



export async function getUserProfile(nextAuthAccessToken: string): Promise<Friend> {
    const results: Array<Friend> = await connection.query(
        "SELECT sessions.user_id AS id, int_users.username, u.image \
        FROM int_users \
        INNER JOIN sessions \
        ON int_users.id = sessions.user_id \
        AND (sessions.access_token = ? OR sessions.session_token = ?) \
        INNER JOIN users AS u \
        ON u.id = int_users.id",
        [nextAuthAccessToken, nextAuthAccessToken]
    );

    await connection.end();

    if (results.length != 1) {
        // should probably throw or something no idea at this point
    }

    return results[0];
}
