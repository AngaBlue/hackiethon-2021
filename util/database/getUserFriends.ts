import { UserRelationship } from "../../types/database";
import connection from "./connection";
import { getUserID } from "./getUserID";

export async function getUserFriends(nextAuthAccessToken: string): Promise<Array<number>> {
    const userID = await getUserID(nextAuthAccessToken);
    const results: Array<
        Partial<UserRelationship>
    > = await connection.query(
        "SELECT main, secondary \
        FROM int_user_relationships \
        WHERE main = ? \
            OR secondary = ?",
        [userID, userID]
    );

    // const results: Array<Partial<User>> = (
    //     await connection.query(
    //         "SET @user_id = (SELECT user_id FROM sessions WHERE access_token = ?); \
    //     SELECT int_users.id, int_users.username \
    //     FROM int_users \
    //     INNER JOIN int_user_relationships AS rel \
    //         ON (int_users.id = rel.main AND rel.main = @user_id) \
    //         OR (int_users.id = rel.secondary AND rel.main = @user_id) \
    //     WHERE int_users.id <> @user_id;",
    //         [nextAuthAccessToken]
    //     )
    // )[1];

    await connection.end();

    return results.map((r) => (r.main == userID && r.confirmed ? r.secondary : r.main));
}
