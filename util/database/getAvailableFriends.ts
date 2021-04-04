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
    const friendsByEvent: UserWithNestedEvents[] = friendEventsSorted.reduce((prev, curr) => {
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

    for (const friend of friendsByEvent) {
        for (const event of friend.events) {
            if (dayjs(event.start_time).isBefore(dayjs()) && dayjs(event.end_time).isAfter(dayjs())) {
                availableFriends = availableFriends.filter((f) => f.id != friend.user_id);
                break;
            }
        }
    }

    return availableFriends;
}
