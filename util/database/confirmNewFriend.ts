import connection from "./connection";
import { getUserID } from "./getUserID";

export async function confirmNewFriend(nextAuthAccessToken: string, friendID: number): Promise<void> {
    const userID = await getUserID(nextAuthAccessToken);
    await connection.query("UPDATE int_user_relationships SET confirmed = true WHERE main = ? AND secondary = ?;", [
        friendID,
        userID
    ]);

    await connection.end();

    return;
}
