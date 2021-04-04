import { useSession } from "next-auth/client";
import React from "react";

import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import Title from "../components/Title";

const settings = function (): JSX.Element {
    const [session] = useSession();
    return (
        <>
            <Head title="Settings" />
            <div className="p-4">
                <Title>Settings</Title>
                <div>
                    <span className="font-bold">Email:</span> <span>{session.user.email}</span>
                </div>
            </div>
        </>
    );
};

export default Secured(settings);
