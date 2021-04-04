import { User, UserAuth } from "../../types/database";
import connection from "./connection";

export type Friend = Pick<User, "id" | "username"> & Pick<UserAuth, "image">;

export async function getUserFriends(nextAuthAccessToken: string): Promise<Friend[]> {
    const results: Friend[] = (
        await connection.query(
            "SET @user_id := (SELECT user_id FROM sessions WHERE (session_token = ? OR access_token = ?)); \
        SELECT int_users.id, int_users.username, u.image \
        FROM int_users \
        INNER JOIN int_user_relationships AS rel \
            ON (int_users.id = rel.main AND rel.secondary = @user_id AND rel.confirmed = true) \
            OR (int_users.id = rel.secondary AND rel.main = @user_id AND rel.confirmed = true) \
        INNER JOIN users AS u \
            ON u.id = int_users.id \
        WHERE int_users.id <> @user_id;",
            [nextAuthAccessToken, nextAuthAccessToken]
        )
    )[1];

    await connection.end();

    return results;
}
