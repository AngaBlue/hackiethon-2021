import { User, UserAuth } from "../../types/database";
import connection from "./connection";

export type FriendRequestData = Pick<User, "id" | "username"> & Pick<UserAuth, "image">;

export async function getFriendRequests(nextAuthAccessToken: string): Promise<Array<FriendRequestData>> {
    const results: Array<FriendRequestData> = await connection.query(
        "SELECT u.id, iu.username AS username, u.image FROM sessions AS s \
        INNER JOIN int_user_relationships AS rel \
            ON rel.secondary = s.user_id AND rel.confirmed = FALSE \
        INNER JOIN users AS u \
            ON rel.main = u.id \
        INNER JOIN int_users as iu \
            ON u.id = iu.id \
        WHERE (s.access_token = ? OR s.session_token = ?)",
        [nextAuthAccessToken, nextAuthAccessToken]
    );

    if (results == null) {
        console.error("Undefined results in getFriendRequest with specified access token of " + nextAuthAccessToken);
    }

    await connection.end();

    return results;
}
