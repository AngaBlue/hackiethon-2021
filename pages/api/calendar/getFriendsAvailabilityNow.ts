import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { getUserEvents, getUserFriends, getUsernameByID, getUserRecurringEvents } from "../../../util/databaseRoutes";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (session.accessToken) {
        const friends = await getUserFriends(session.accessToken);
        const availableFriends = [];
        for (const friend of friends) {
            let available = true;
            const friendEvents = await getUserEvents(friend);
            const friendRecurringEvents = await getUserRecurringEvents(friend);

            for (const event of friendEvents) {
                if (event.startTime.isBefore(dayjs()) && event.endTime.isAfter(dayjs())) {
                    available = false;
                }
            }

            for (const event of friendRecurringEvents) {
                if (
                    event.startTime.isBefore(dayjs()) &&
                    event.endTime.isAfter(dayjs()) &&
                    event.dayOfWeek == dayjs().day()
                ) {
                    available = false;
                }
            }

            if (available) {
                availableFriends.push(friend);
            }
        }

        const availableFriendUsernames = availableFriends.map((id) => getUsernameByID(id));

        res.status(200).json(availableFriendUsernames);
    } else {
        res.status(500);
    }
};
