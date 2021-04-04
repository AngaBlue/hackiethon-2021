import { Session } from "../../types/database";
import connection from "./connection";

export async function getUserID(nextAuthAccessToken: string): Promise<number> {
    const results: Array<
        Partial<Session>
    > = await connection.query(
        "SELECT user_id \
        FROM sessions \
        WHERE access_token = ? OR session_token = ?;",
        [nextAuthAccessToken, nextAuthAccessToken]
    );

    await connection.end();

    if (results.length != 1) {
        return -1;
    }

    return results[0].user_id;
}
