import { UserRelationship } from "../../types/database";
import connection from "./connection";
import { getUserID } from "./getUserID";
import { getUsernameByID } from "./getUsernameByID";

export async function getFriendRequests(nextAuthAccessToken: string): Promise<Array<string>> {
    const userID = await getUserID(nextAuthAccessToken);
    const results: Array<
        Partial<UserRelationship>
    > = await connection.query("SELECT main FROM int_users_relationships WHERE confirmed = false AND secondary = ?", [
        userID
    ]);

    await connection.end();

    const output = [];

    for (const result of results) {
        output.push(await getUsernameByID(result.main));
    }

    return output;
}
