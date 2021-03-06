import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { deleteEvent } from "../../../util/database/deleteEvent";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (session?.accessToken && typeof req.query.eventID == "string") {
        deleteEvent(session.accessToken, Number(req.query.eventID));
        res.status(200).json({});
    } else {
        res.status(500).json({});
    }
};
