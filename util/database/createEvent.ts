import { Dayjs } from "dayjs";

import { CalendarEvents } from "../../types/database";
import connection from "./connection";
import { getUserID } from "./getUserID";

const MYSQL_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export async function createEvent(
    nextAuthAccessToken: string,
    startTime: Dayjs,
    endTime: Dayjs
): Promise<CalendarEvents> {
    const userId = await getUserID(nextAuthAccessToken);
    // Create new event and persist event ID
    // Use event ID to create new mapping between user and event

    const db_startTime = startTime.format(MYSQL_DATE_TIME_FORMAT);
    const db_endTime = endTime.format(MYSQL_DATE_TIME_FORMAT);
    const st_utcOffset = startTime.utcOffset();
    const et_utcOffset = endTime.utcOffset();

    if (st_utcOffset != et_utcOffset) {
        // Maybe throw an error here? Not sure. TODO: FIXME
    }

    // let db_utcOffset = `${Math.floor(st_utcOffset / 60)}${st_utcOffset % 60}`

    const event_results = await connection.query(
        "INSERT INTO calendar_events (external_id, start_time, end_time, utc_offset) VALUES(?, ?, ?, ?); \
        SET @new_event_id := (SELECT LAST_INSERT_ID()); \
        INSERT INTO user_events VALUES(?, @new_event_id, 1); \
        SELECT * FROM calendar_events WHERE id = @new_event_id;",
        [null, db_startTime, db_endTime, st_utcOffset, userId]
    );
    await connection.end();

    return event_results[3];
}
