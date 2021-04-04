import { UserRelationship } from "../../types/database";
import connection from "./connection";
import { getUserID } from "./getUserID";

export async function doesUserFriendExist(nextAuthAccessToken: string, friendID: number): Promise<boolean> {
    const userID = await getUserID(nextAuthAccessToken);

    const result: Array<
        Partial<UserRelationship>
    > = await connection.query(
        "SELECT * FROM int_user_relationships WHERE ((main = ? AND secondary = ?) OR (main = ? AND secondary = ?)) AND confirmed = true",
        [userID, friendID, friendID, userID]
    );

    await connection.end();

    return result.length > 0;
}
