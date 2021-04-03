import { Dayjs } from "dayjs";
import { createConnection } from "mysql";

import { UserInfoType } from "./types";

const connection = createConnection({
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_ID,
    password: process.env.DATABASE_SECRET,
    database: process.env.DATABASE_NAME
});

// NOTHING IN HERE HAS YET BEEN TESTED

// Returns username based off nextAuthID
export function getUsername(nextAuthAccessToken: string): string {
    connection.query(
        "SELECT sessions.id, int_users.username \
        FROM int_users \
        INNER JOIN sessions \
        ON int_users.id = sessions.user_id \
        AND sessions.access_token = [nextAuthAccessToken]",
        function (error, results, fields) {
            if (error) throw error;
            // connected!
        }
    );
    console.error("getUsername function is incomplete");
    return;
}

export function setUsername(nextAuthAccessToken: string, userInfo: UserInfoType): void {
    // Should set the username by userID
    console.error("setUsername function is incomplete");
    return;
}

export function getUserFriends(nextAuthAccessToken: string): Array<string> {
    connection.query(
        "SELECT int_users.id, int_users.username, int_users.last_online \
        FROM (SELECT id FROM int_users WHERE id = [user ID]) AS int_users \
        INNER JOIN int_user_relationships AS rel \
        ON int_users.id = rel.primary \
        OR int_users.id = rel.secondary \
        WHERE int_users.id <> [user ID];",
        function (error, results, fields) {
            if (error) throw error;
            // connected!
        }
    );
    console.error("getUserFriends function is incomplete");
    return;
}

export function getUserID(nextAuthAccessToken: string): number {
    connection.query(
        "SELECT user_id \
        FROM sessions \
        WHERE access_token = [nextAuthAccessToken];",
        function (error, results, fields) {
            if (error) throw error;
            // connected!
        }
    );
    console.error("getUserFriends function is incomplete");
    return;
}

export function createNewUser(id: number, username: string): void {
    connection.query("", function (error, results, fields) {
        if (error) throw error;
        // connected!
    });
    console.error("createNewUser function is incomplete");
    return;
}

export function createEvent(nextAuthAccessToken: string, startTime: Dayjs, endTime: Dayjs) {
    console.error("createEvent function is incomplete");
    return;
}

export function createRecurringEvent(nextAuthAccessToken: string, startTime: Dayjs, endTime: Dayjs, dayOfWeek: number) {
    console.error("createRecurringEvent function is incomplete");
    return;
}
