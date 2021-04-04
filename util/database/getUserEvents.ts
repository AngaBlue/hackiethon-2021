import { CalendarEvents } from "../../types/database";
import connection from "./connection";

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
