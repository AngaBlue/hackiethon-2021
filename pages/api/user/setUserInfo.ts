import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { setUsername } from "../../../util/databaseRoutes";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (session.accessToken && typeof req.query.username == "string") {
        setUsername(session.accessToken, { username: req.query.username });
        res.status(200);
    } else {
        res.status(500);
    }
};
