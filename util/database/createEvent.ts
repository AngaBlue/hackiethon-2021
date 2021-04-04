import { Dayjs } from "dayjs";

import connection from "./connection";
import { getUserID } from "./getUserID";

const MYSQL_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export async function createEvent(nextAuthAccessToken: string, startTime: Dayjs, endTime: Dayjs): Promise<number> {

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

    const new_event_id = await connection.query(
        "INSERT INTO calendar_events (external_id, start_time, end_time, utc_offset) VALUES(?, ?, ?, ?); SELECT LAST_INSERT_ID()",
        [null, db_startTime, db_endTime, st_utcOffset]
    );

    await connection.query("INSERT INTO user_events VALUES(?, ?, 1)", [userId, new_event_id[1]]);

    await connection.end();

    return;
}
