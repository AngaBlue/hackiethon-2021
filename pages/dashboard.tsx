import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

import Card from "../components/Card";
import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import UserCard from "../components/UserCard";
import styles from "../styles/pages/dashboard.module.scss";
import { PromiseResolvedType } from "../types/util";
import { getAvailableFriends } from "../util/database/getAvailableFriends";
import plainObject from "../util/plainObject";

interface ServerSideProps {
    availableFriends: PromiseResolvedType<ReturnType<typeof getAvailableFriends>>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (ctx) => {
    const token = ctx.req.cookies["next-auth.session-token"];
    return {
        props: {
            availableFriends: plainObject(await getAvailableFriends(token))
        }
    };
};

const dashboard = function ({ availableFriends }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    return (
        <>
            <Head title="Dashboard" />
            <div className="p-4">
                <Card title="Who's Around" className="mb-4">
                    {availableFriends.length > 0 ? (
                        availableFriends.map((friend) => (
                            <div key={friend.username} className="flex items-center justify-between p-4">
                                <UserCard
                                    {...{ name: friend.username, image: friend.image }}
                                    className="mr-4 inline-flex"
                                />
                                <div className={`bg-green-500 rounded-full h-4 w-4 ${styles.indicator} inline-block`} />
                            </div>
                        ))
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
