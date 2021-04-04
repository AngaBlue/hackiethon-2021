import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import React, { useState } from "react";

import Button from "../components/Button";
import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import Title from "../components/Title";
import AsyncState from "../types/AsyncState";
import { PromiseResolvedType } from "../types/util";
import { getUserProfile } from "../util/database/getUserProfile";
import getHost from "../util/getHost";
import plainObject from "../util/plainObject";

interface ServerSideProps {
    profile: PromiseResolvedType<ReturnType<typeof getUserProfile>>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (ctx) => {
    const token = ctx.req.cookies["next-auth.session-token"];
    const [profile] = await Promise.all([getUserProfile(token)]);
    return {
        props: {
            profile: plainObject(profile)
        }
    };
};

const settings = function ({ profile }: ServerSideProps): JSX.Element {
    const [session] = useSession();
    const [username, setUsername] = useState(AsyncState(profile.username));

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
                <div className="mb-4">
                    <span className="font-bold">User ID:</span> <span>{profile.id}</span>
                    <br />
                    <span className="font-bold">Email:</span> <span>{session.user.email}</span>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        className="rounded border-gray-200 border-2 p-2"
                        value={username.data}
                        onChange={(e) => setUsername({ ...username, data: e.target.value })}
                        onKeyPress={(e) => e.key === "Enter" && updateUsername()}
                        disabled={username.loading}
                    />
                    <Button
                        variant="primary"
                        onClick={updateUsername}
                        disabled={username.loading}
                        className="inline-block ml-4">
                        {username.loading ? "Loading..." : "Update Username"}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Secured(settings);
