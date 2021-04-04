import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import FriendEntry from "../components/FriendEntry";

import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import Title from "../components/Title";
import AsyncState from "../types/AsyncState";
import { PromiseResolvedType } from "../types/util";
import { getFriendRequests } from "../util/database/getFriendRequests";
import { Friend, getUserFriends } from "../util/database/getUserFriends";
import getHost from "../util/getHost";
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
    const [friend, setFriend] = useState(AsyncState(""));

    function deleteFriend(id: Friend["id"]) {
        const index = state.findIndex((f) => f.id === id);
        if (index > -1) {
            state.splice(index, 1);
        }
        setState([...state]);
    }

    async function addFriend() {
        let name = friend.data;
        if (!name) return;
        name = name.trim();
        if (name.length > 32) {
            name = name.slice(0, 32);
            setFriend({ ...friend, data: name });
        }
        //Request
        if (friend.loading) return;
        setFriend((f) => ({ ...f, loading: true, error: null }));
        const res = await fetch(`${getHost()}/api/friend/createFriendRequest?username=${friend.data}`);
        if (res.ok) {
            setFriend({ ...friend, loading: false, data: "", error: null });
        } else {
            setFriend({ ...friend, loading: false, data: "", error: await res.json() });
        }
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
                <Title>Add Friend</Title>
                <p className="mb-4">
                    Add a friend by their username. Please keep in mind that usernames are case sensitive.
                </p>
                <input
                    className="rounded border-gray-200 border-2 mb-4 p-2"
                    value={friend.data}
                    onChange={(e) => setFriend({ ...friend, data: e.target.value })}
                    onKeyPress={(e) => e.key === "Enter" && addFriend}
                />
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
