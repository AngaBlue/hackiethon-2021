import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { CalendarEventsWithUserInfo, UserAuth } from "../../../types/database";
import { getUserEvents } from "../../../util/database/getUserEvents";
import { getUserFriends } from "../../../util/database/getUserFriends";
import { getUserImage } from "../../../util/database/getUserImage";
import { getUsernameByID } from "../../../util/database/getUsernameByID";
import { getFriendEventsWithUserInfo } from "../../../util/database/getFriendEventsWithUserInfo";
import { UserWithNestedEvents } from "../../../types/util";

export type getFriendsAvailabilityResponse = Pick<UserAuth, "name" | "image">[];

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const accessToken = (req.query.access as string) || (await getSession({ req }))?.accessToken || null;
    if (accessToken) {
        const availableFriends :UserWithNestedEvents[] = new Array();

        const friendEvents = (await getFriendEventsWithUserInfo(accessToken));

        let friendEventsSorted = friendEvents.sort((a, b) => (a.user_id > b.user_id) ? 1 : -1);
        let friendsByEvent :UserWithNestedEvents[] = friendEventsSorted.reduce((prev, curr) => {
            let filtered_results = prev.filter((p) => p.user_id == curr.user_id);
            let current_obj :UserWithNestedEvents;

            if (filtered_results.length == 0) {
                current_obj = new UserWithNestedEvents(curr.user_id, curr.username, curr.image);
                prev.push(current_obj);
            }
            else {
                current_obj = filtered_results[1];
            }

            current_obj.events.push(
            {
                "id": curr.id,
                "external_id": curr.external_id,
                "start_time": curr.start_time,
                "end_time": curr.end_time,
                "utc_offset": curr.utc_offset
            });
            
            return prev;
        }, new Array());

        for (const friend of friendsByEvent) {
            let available = true;
            for (const event of friend.events) {
                if (dayjs(event.start_time).isBefore(dayjs()) && dayjs(event.end_time).isAfter(dayjs())) {
                    available = false;
                }
            }

            if (available) {
                availableFriends.push(friend);
            }
        }

        res.status(200).json(
            availableFriends.map(f => {
                return {
                    name: f.username,
                    image: f.image
                };
            })
        );
    } else {
        res.status(500).json({});
    }
};
