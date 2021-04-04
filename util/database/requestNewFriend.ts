import connection from "./connection";
import { getIDByUsername } from "./getIDByUsername";
import { getUserID } from "./getUserID";

export async function requestNewFriend(nextAuthAccessToken: string, friendUsername: string): Promise<void> {
    const userID = await getUserID(nextAuthAccessToken);
    const friendID = await getIDByUsername(friendUsername);

    await connection.query("INSERT INTO int_user_relationships (main, secondary, confirmed) VALUES (?, ?, FALSE);", [
        userID,
        friendID
    ]);

    await connection.end();

    return;
}
