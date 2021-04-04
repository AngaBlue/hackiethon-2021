import { UserInfo } from "../../types/database";
import connection from "./connection";

export async function setUsername(nextAuthAccessToken: string, userInfo: UserInfo): Promise<void> {
    await connection.query(
        "UPDATE social_motion_dev.int_users \
        INNER JOIN sessions \
            ON sessions.user_id = int_users.id \
            AND (sessions.access_token = ? OR sessions.session_token = ?) \
        SET int_users.username = ?;",
        [nextAuthAccessToken, nextAuthAccessToken, userInfo.username]
    );

    await connection.end();
    return;
}
