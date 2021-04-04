import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { confirmNewFriend } from "../../../util/database/confirmNewFriend";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (session?.accessToken && typeof req.query.friendID == "string") {
        confirmNewFriend(session.accessToken, Number(req.query.friendID));
        res.status(200).json({});
    } else {
        res.status(500).json({});
    }
};
