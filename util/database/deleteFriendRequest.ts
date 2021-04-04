import connection from "./connection";
import { getUserID } from "./getUserID";

export async function deleteFriendRequest(nextAuthAccessToken: string, friendID: number): Promise<void> {
    const userID = await getUserID(nextAuthAccessToken);
    connection.query(
        "DELETE FROM int_user_relationships WHERE (main = ? AND secondary = ?) OR (main = ? AND secondary = ?)",
        [friendID, userID, userID, friendID]
    );
}
