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
import { getAvailableFriends } from "../../../util/database/getAvailableFriends";

export type getFriendsAvailabilityResponse = Pick<UserAuth, "name" | "image">[];

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const accessToken = (req.query.access as string) || (await getSession({ req }))?.accessToken || null;
    if (accessToken) {
        let availableFriends = await getAvailableFriends(accessToken);

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
