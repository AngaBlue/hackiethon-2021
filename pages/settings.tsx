import { useSession } from "next-auth/client";
import React, { useState } from "react";

import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import Title from "../components/Title";
import AsyncState from "../types/AsyncState";
import getHost from "../util/getHost";

const settings = function (): JSX.Element {
    const [session] = useSession();

    const [username, setUsername] = useState(AsyncState(session.user.name || ""));

    async function updateUsername() {
        let name = username.data;
        if (!name) return;
        name = name.trim();
        if (name.length > 32) {
            name = name.slice(0, 32);
            setUsername({ ...username, data: name });
        }
        //Request
        if (username.loading) return;
        setUsername((f) => ({ ...f, loading: true, error: null }));
        const res = await fetch(`${getHost()}/api/user/setUserInfo?username=${username.data}`);
        if (res.ok) {
            setUsername({ ...username, loading: false, error: null });
        } else {
            setUsername({ ...username, loading: false, error: await res.json() });
        }
    }
    
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
