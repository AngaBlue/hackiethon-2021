import connection from "./connection";
import { getUserID } from "./getUserID";

export async function requestNewFriend(nextAuthAccessToken: string, friendID: number): Promise<void> {
    const userID = await getUserID(nextAuthAccessToken);
    await connection.query("INSERT INTO int_user_relationships (main, secondary, confirmed) VALUES (?, ?, FALSE);", [
        userID,
        friendID
    ]);

    await connection.end();

    return;
}
