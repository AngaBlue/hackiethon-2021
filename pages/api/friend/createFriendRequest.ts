import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { doesUserFriendExist } from "../../../util/database/doesUserFriendExist";
import { doesUserRequestExist } from "../../../util/database/doesUserRequestExist";
import { requestNewFriend } from "../../../util/database/requestNewFriend";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (session?.accessToken && typeof req.query.friendID == "string") {
        if (await doesUserFriendExist(session.accessToken, Number(req.query.friendID))) {
            res.status(400).json({ message: "User is already your friend" });
            return;
        }
        if (await doesUserRequestExist(session.accessToken, Number(req.query.friendID))) {
            res.status(400).json({ message: "This request already exists" });
            return;
        }
        requestNewFriend(session.accessToken, Number(req.query.friendID));
        res.status(200).json({});
    } else {
        res.status(500).json({});
    }
};
