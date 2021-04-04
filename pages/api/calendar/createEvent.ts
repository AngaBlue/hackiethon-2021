import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { createEvent } from "../../../util/databaseRoutes";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (session?.accessToken && typeof req.query.startTime == "string" && typeof req.query.endTime == "string") {
        createEvent(session.accessToken, dayjs(req.query.startTime), dayjs(req.query.endTime));
        res.status(200);
    } else {
        res.status(500).json({});
    }
};
