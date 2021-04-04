import { UserRelationship } from "../../types/database";
import { User } from "../../types/database";
import connection from "./connection";
import { getUserID } from "./getUserID";

export async function getUserFriends(nextAuthAccessToken: string): Promise<Array<Partial<User>>> {
    const results: Array<Partial<User>> = (
        await connection.query(
            "SET @user_id := (SELECT user_id FROM sessions WHERE (session_token = ? OR access_token = ?)); \
        SELECT int_users.id, int_users.username \
        FROM int_users \
        INNER JOIN int_user_relationships AS rel \
            ON (int_users.id = rel.main AND rel.main = @user_id) \
            OR (int_users.id = rel.secondary AND rel.main = @user_id) \
        WHERE int_users.id <> @user_id;",
            [nextAuthAccessToken, nextAuthAccessToken]
        )
    )[1];

    await connection.end();

    return results;
}