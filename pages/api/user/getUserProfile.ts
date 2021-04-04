import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { getUserProfile } from "../../../util/database/getUserProfile";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const session = await getSession({ req });

    if (session?.accessToken) {
        res.status(200).json(await getUserProfile(session.accessToken));
    } else {
        res.status(500).json({});
    }
};
