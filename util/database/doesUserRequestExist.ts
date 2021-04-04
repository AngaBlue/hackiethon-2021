import { UserRelationship } from "../../types/database";
import connection from "./connection";
import { getIDByUsername } from "./getIDByUsername";
import { getUserID } from "./getUserID";

export async function doesUserRequestExist(nextAuthAccessToken: string, friendUsername: string): Promise<boolean> {
    const userID = await getUserID(nextAuthAccessToken);
    const friendID = await getIDByUsername(friendUsername);

    const result: Array<
        Partial<UserRelationship>
    > = await connection.query(
        "SELECT * FROM int_user_relationships WHERE ((main = ? AND secondary = ?) OR (main = ? AND secondary = ?)) AND confirmed = false",
        [userID, friendID, friendID, userID]
    );

    await connection.end();

    return result.length > 0;
}
