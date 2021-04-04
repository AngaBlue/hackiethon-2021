import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { createEvent } from "../../../util/database/createEvent";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (session?.accessToken && typeof req.query.startTime == "string" && typeof req.query.endTime == "string") {
        const eventResult = createEvent(
            session.accessToken,
            dayjs(Number(req.query.startTime)),
            dayjs(Number(req.query.endTime))
        );
        res.status(200).json(eventResult);
    } else {
        res.status(500).json({});
    }
};
