import connection from "./connection";
import { User, UserAuth } from "../../types/database";
import { getUserID } from "./getUserID";
import { getUsernameByID } from "./getUsernameByID";

export type FriendRequestData = Pick<User, "id" | "username"> & Pick<UserAuth, "image">

export async function getFriendRequests(nextAuthAccessToken: string): Promise<Array<FriendRequestData>> {
    const userID = await getUserID(nextAuthAccessToken);
    const results: Array<FriendRequestData> = await connection.query(
        "SELECT u.id, u.name AS username, u.image FROM social_motion_dev.int_user_relationships AS rel \
        INNER JOIN users AS u \
            ON rel.secondary = ? AND rel.confirmed = FALSE AND rel.main = u.id",
        [userID]
    );

    await connection.end();

    return results;
}
