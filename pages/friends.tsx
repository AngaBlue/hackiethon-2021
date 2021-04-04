import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import FriendEntry from "../components/FriendEntry";

import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import Title from "../components/Title";
import { PromiseResolvedType } from "../types/util";
import { getUserFriends } from "../util/database/getUserFriends";

interface ServerSideProps {
    friends: PromiseResolvedType<ReturnType<typeof getUserFriends>>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (ctx) => {
    const friends = await getUserFriends(ctx.req.cookies["next-auth.session-token"]);
    return {
        props: {
            friends: JSON.parse(JSON.stringify(friends))
        }
    };
};

const friends = function ({ friends }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    return (
        <>
            <Head title="Friends" />
            <div className="p-4">
                <Title>Friends</Title>
                {friends.length > 0 ? (
                    <div>
                        {friends.map((friend) => (
                            <FriendEntry {...friend} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">You don't have any friends.</p>
                )}
            </div>
        </>
    );
};

export default Secured(friends);
