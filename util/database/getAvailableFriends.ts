import dayjs from "dayjs";

import { UserWithNestedEvents } from "../../types/util";
import connection from "./connection";
import { getFriendEventsWithUserInfo } from "./getFriendEventsWithUserInfo";
import { Friend, getUserFriends } from "./getUserFriends";

export async function getAvailableFriends(nextAuthAccessToken: string): Promise<Array<Friend>> {
    const userFriends = await getUserFriends(nextAuthAccessToken);

    const friendEvents = await getFriendEventsWithUserInfo(nextAuthAccessToken);

    await connection.end();

    const friendEventsSorted = friendEvents.sort((a, b) => (a.user_id > b.user_id ? 1 : -1));

    const friendsWithEvents: UserWithNestedEvents[] = friendEventsSorted.reduce((prev, curr) => {
        const filtered_results = prev.filter((p) => p.user_id == curr.user_id);
        let current_obj: UserWithNestedEvents;

        if (filtered_results.length == 0) {
            current_obj = new UserWithNestedEvents(curr.user_id, curr.username, curr.image);
            prev.push(current_obj);
        } else {
            current_obj = filtered_results[0];
        }

        current_obj.events.push({
            id: curr.id,
            external_id: curr.external_id,
            start_time: curr.start_time,
            end_time: curr.end_time,
            utc_offset: curr.utc_offset
        });

        return prev;
    }, []);

    let availableFriends = userFriends;

    for (const friend of friendsWithEvents) {
        for (const event of friend.events) {
            // console.log("UTC offset: " + event.utc_offset);
            // console.log(`StartTime: ${dayjs(event.start_time).add((0 - event.start_time.getTimezoneOffset() + event.utc_offset), "minute")}`);
            // console.log(`EndTime: ${event.end_time} INTERPRETED: ${dayjs(event.end_time).add((0 - event.end_time.getTimezoneOffset() + event.utc_offset), "minute")}`);

            // Compensate for JS dates not containing timezone data and thus treating it as though it's local time
            if (
                dayjs(event.start_time)
                    .add(0 - event.start_time.getTimezoneOffset(), "minute")
                    .isBefore(dayjs()) &&
                dayjs(event.end_time)
                    .add(0 - event.end_time.getTimezoneOffset(), "minute")
                    .isAfter(dayjs())
            ) {
                availableFriends = availableFriends.filter((f) => f.id != friend.user_id);
                break;
            }
        }
    }

    return availableFriends;
}
