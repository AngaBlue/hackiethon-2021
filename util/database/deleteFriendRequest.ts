import connection from "./connection";
import { getIDByUsername } from "./getIDByUsername";
import { getUserID } from "./getUserID";

export async function deleteFriendRequest(nextAuthAccessToken: string, friendUsername: string): Promise<void> {
    const userID = await getUserID(nextAuthAccessToken);
    const friendID = await getIDByUsername(friendUsername);
    connection.query(
        "DELETE FROM int_user_relationships WHERE (main = ? AND secondary = ?) OR (main = ? AND secondary = ?)",
        [friendID, userID, userID, friendID]
    );
}
