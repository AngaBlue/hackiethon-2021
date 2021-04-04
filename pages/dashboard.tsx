import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import fetch from "node-fetch";
import React from "react";

import Card from "../components/Card";
import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import UserCard from "../components/UserCard";
import styles from "../styles/pages/dashboard.module.scss";
import { getFriendsAvailabilityResponse } from "./api/calendar/getFriendsAvailabilityNow";

interface ServerSideProps {
    availableFriends: getFriendsAvailabilityResponse;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (ctx) => {
    const res = await fetch(
        `http://localhost:3000/api/calendar/getFriendsAvailabilityNow?access=${ctx.req.cookies["next-auth.session-token"]}`
    );
    const availableFriends: getFriendsAvailabilityResponse = await res.json();
    return {
        props: {
            availableFriends
        }
    };
};

const dashboard = function ({ availableFriends }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    availableFriends = [{ name: "Test", image: "" }];
    return (
        <>
            <Head title="Dashboard" />
            <div className="p-4">
                <Card title="Who's Around" className="mb-4">
                    {availableFriends.length > 0 ? (
                        <div>
                            {availableFriends.map((friend) => (
                                <div key={friend.name}>
                                    <UserCard {...friend} className="mr-4" />
                                    <div className={`bg-green-500 rounded-full h-2 w-2 ${styles.indicator}`} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center px-4 py-16 w-full">
                            Looks like everyone&apos;s busy right now :(
                            <br />
                            Come back later to find someone to hang out with!
                        </p>
                    )}
                </Card>
                <Card title="Friend Requests">
                    <p className="text-center px-4 py-16">You don&apos;t have any pending friend requests.</p>
                </Card>
            </div>
        </>
    );
};

export default Secured(dashboard);
