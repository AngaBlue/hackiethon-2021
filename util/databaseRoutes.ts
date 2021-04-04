import { Dayjs } from "dayjs";
import serverlessMySQL from "serverless-mysql";

import { CalendarEvents, Session, User, UserAuth, UserRelationship } from "./databaseTypes";
import { RecurringEvent, UserInfoType } from "./types";

const connection = serverlessMySQL({
    config: {
        host: process.env.DATABASE_URL,
        user: process.env.DATABASE_ID,
        password: process.env.DATABASE_SECRET,
        database: process.env.DATABASE_NAME,
        multipleStatements: true
    }
});

// NOTHING IN HERE HAS YET BEEN TESTED

// Returns username based off nextAuthID
export async function getUsername(nextAuthAccessToken: string): Promise<string> {
    const results: Array<
        Partial<User>
    > = await connection.query(
        "SELECT sessions.id, int_users.username \
        FROM int_users \
        INNER JOIN sessions \
        ON int_users.id = sessions.user_id \
        AND sessions.access_token = ?",
        [nextAuthAccessToken]
    );

    await connection.end();

    if (results.length != 1) {
        return "";
    }

    return results[0].username;
}

export async function setUsername(nextAuthAccessToken: string, userInfo: UserInfoType): Promise<void> {
    await connection.query(
        "UPDATE social_motion_dev.int_users \
        INNER JOIN sessions \
            ON sessions.user_id = int_users.id \
            AND sessions.access_token = ? \
        SET int_users.username = ?;",
        [nextAuthAccessToken, userInfo.username]
    );

    await connection.end();
    return;
}

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

    return results.map((r) => (r.main == userID ? r.secondary : r.main));
}

export async function getUserID(nextAuthAccessToken: string): Promise<number> {
    const results: Array<
        Partial<Session>
    > = await connection.query("SELECT user_id \
        FROM sessions \
        WHERE access_token = ?;", [
        nextAuthAccessToken
    ]);

    await connection.end();

    if (results.length != 1) {
        return -1;
    }

    return results[0].user_id;
}

export async function createNewUser(id: number, username: string): Promise<void> {
    await connection.query("INSERT INTO int_users (id, username, last_login) VALUES (?, ?, NOW());", [id, username]);

    await connection.end();

    return;
}

export function createEvent(nextAuthAccessToken: string, startTime: Dayjs, endTime: Dayjs): Promise<number> {
    // Create new event and persist event ID
    // Use event ID to create new mapping between user and event
    console.error("createEvent function is incomplete");
    return;
}

export function createRecurringEvent(
    nextAuthAccessToken: string,
    startTime: Dayjs,
    endTime: Dayjs,
    dayOfWeek: number
): void {
    // Needs database schema update
    // Create new event with recurring flag set to true and specified repeat frequency
    // Maybe roll into createEvent with mandatory recurring boolean parameter?
    console.error("createRecurringEvent function is incomplete");
    return;
}

export function deleteEvent(nextAuthAccessToken: string, startTime: Dayjs, endTime: Dayjs): void {
    // TODO: Change this to accept an event ID
    // Check if event ID has mapping to user ID
    // If so, remove mapping and check if any further mappings to that event ID exist
    // If none, then delete event
    // Otherwise, event should remain in db as it's being used by other users
    console.error("deleteEvent function is incomplete");
    return;
}

export function deleteRecurringEvent(
    nextAuthAccessToken: string,
    startTime: Dayjs,
    endTime: Dayjs,
    dayOfWeek: number
): void {
    // Same as deleteEvent but may change depending on how recurring events are stored in the DB
    console.error("deleteRecurringEvent function is incomplete");
    return;
}

export async function getUserEvents(id: number): Promise<Partial<CalendarEvents>[]> {
    const results: Array<
        Partial<CalendarEvents>
    > = await connection.query(
        "SELECT ce.* FROM calendar_events as ce \
        INNER JOIN user_events as ue \
        ON (ce.id = ue.event_id AND ue.user_id = ?);",
        [id]
    );

    await connection.end();

    return results;
}

export function getUserRecurringEvents(id: number): RecurringEvent[] {
    // TODO: Figure out how to store recurring events
    console.error("getUserRecurringEvents function is incomplete");
    return;
}

export async function getUsernameByID(id: number): Promise<string> {
    const results: Array<Partial<User>> = await connection.query("SELECT username FROM int_users WHERE id = ?", [id]);

    await connection.end();

    if (results.length != 1) {
        // Should throw?
        return "";
    }

    return results[0].username;
}

export async function getIDByUsername(username: string): Promise<number> {
    const results: Array<Partial<User>> = await connection.query("SELECT id FROM int_users WHERE username = ?", [
        username
    ]);

    await connection.end();

    if (results.length != 1) {
        // Should throw?
        return -1;
    }

    return results[0].id;
}

export async function getUserImage(id: number): Promise<string> {
    const results: Array<Partial<UserAuth>> = await connection.query("SELECT image FROM users WHERE id = ?", [id]);

    await connection.end();

    if (results.length != 1) {
        // Should throw?
        return "";
    }

    return results[0].image;
}
