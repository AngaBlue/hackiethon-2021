import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import {
    getUserEvents,
    getUserFriends,
    getUserImage,
    getUsernameByID
    // getUserRecurringEvents
} from "../../../util/databaseRoutes";
import { UserAuth } from "../../../util/databaseTypes";

export type getFriendsAvailabilityResponse = Pick<UserAuth, "name" | "image">[];

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const accessToken = (req.query.access as string) || (await getSession({ req }))?.accessToken || null;
    if (accessToken) {
        const friends = await getUserFriends(accessToken);
        const availableFriends = [];
        for (const friend of friends) {
            let available = true;
            const friendEvents = await getUserEvents(friend);
            // const friendRecurringEvents = await getUserRecurringEvents(friend);

            for (const event of friendEvents) {
                if (dayjs(event.start_time).isBefore(dayjs()) && dayjs(event.end_time).isAfter(dayjs())) {
                    available = false;
                }
            }

            // for (const event of friendRecurringEvents) {
            //     if (
            //         event.startTime.isBefore(dayjs()) &&
            //         event.endTime.isAfter(dayjs()) &&
            //         event.dayOfWeek == dayjs().day()
            //     ) {
            //         available = false;
            //     }
            // }

            if (available) {
                availableFriends.push(friend);
            }
        }

        const availableFriendUsernames: string[] = [];
        const availableFriendPictures: string[] = [];

        for (const id of availableFriends) {
            availableFriendUsernames.push(await getUsernameByID(id));
            availableFriendPictures.push(await getUserImage(id));
        }

        res.status(200).json(
            availableFriendUsernames.map((e, i) => {
                return { name: e, image: availableFriendPictures[i] };
            })
        );
    } else {
        res.status(500).json({});
    }
};
