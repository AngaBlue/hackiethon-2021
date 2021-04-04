import * as dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { createRecurringEvent } from "../../../util/databaseRoutes";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (
        session?.accessToken &&
        typeof req.query.startTime == "string" &&
        typeof req.query.endTime == "string" &&
        typeof req.query.dayOfWeek == "number"
    ) {
        createRecurringEvent(
            session.accessToken,
            dayjs(req.query.startTime),
            dayjs(req.query.endTime),
            req.query.dayOfWeek
        );
        res.status(200);
    } else {
        res.status(500);
    }
};
