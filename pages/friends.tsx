import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import FriendEntry from "../components/FriendEntry";

import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import Title from "../components/Title";
import { PromiseResolvedType } from "../types/util";
import { getFriendRequests } from "../util/database/getFriendRequests";
import { Friend, getUserFriends } from "../util/database/getUserFriends";
import plainObject from "../util/plainObject";

interface ServerSideProps {
    friends: PromiseResolvedType<ReturnType<typeof getUserFriends>>;
    requests: PromiseResolvedType<ReturnType<typeof getFriendRequests>>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (ctx) => {
    const token = ctx.req.cookies["next-auth.session-token"];
    const [friends, requests] = await Promise.all([getUserFriends(token), getFriendRequests(token)]);
    return {
        props: {
            friends: plainObject(friends),
            requests: plainObject(requests)
        }
    };
};

const friends = function ({ friends, requests }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    const [state, setState] = useState(friends);

    function deleteFriend(id: Friend["id"]) {
        const index = state.findIndex((f) => f.id === id);
        if (index > -1) {
            state.splice(index, 1);
        }
        setState([...state]);
    }

    return (
        <>
            <Head title="Friends" />
            <div className="p-4">
                <Title>Friends</Title>
                {friends.length > 0 ? (
                    <div className="mb-4">
                        {state.map((friend) => (
                            <FriendEntry {...{ deleteFriend }} {...friend} key={friend.id} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">You don't have any friends.</p>
                )}
                <Title>Friend Requests</Title>
                {requests.length > 0 ? (
                    <div className="mb-4">
                        {/* {requests.map((friend) => (
                            <FriendEntry {...{ deleteFriend }} {...friend} key={friend.id} />
                        ))} */}
                    </div>
                ) : (
                    <p className="text-center">You don't have any friend requests.</p>
                )}
            </div>
        </>
    );
};

export default Secured(friends);
