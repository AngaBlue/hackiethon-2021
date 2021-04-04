import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { getFriendRequests } from "../../../util/database/getFriendRequests";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (session?.accessToken) {
        res.status(200).json(getFriendRequests(session.accessToken));
    } else {
        res.status(500).json({});
    }
};
