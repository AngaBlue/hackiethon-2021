import { User } from "../../types/database";
import connection from "./connection";

export async function getUsername(nextAuthAccessToken: string): Promise<string> {
    const results: Array<
        Partial<User>
    > = await connection.query(
        "SELECT sessions.id, int_users.username \
        FROM int_users \
        INNER JOIN sessions \
        ON int_users.id = sessions.user_id \
        AND sessions.access_token = ?",
        [nextAuthAccessToken]
    );

    await connection.end();

    if (results.length != 1) {
        return "";
    }

    return results[0].username;
}
