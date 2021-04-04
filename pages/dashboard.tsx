import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import Title from "../components/Title";
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
    const [availableFriends] = await Promise.all([getAvailableFriends(token)]);
    return {
        props: {
            availableFriends: plainObject(availableFriends)
        }
    };
};

const dashboard = function ({ availableFriends }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    return (
        <>
            <Head title="Dashboard" />
            <div className="p-4">
                <Title>Who&apos;s Around?</Title>
                {availableFriends.length > 0 ? (
                    availableFriends.map((friend) => (
                        <div key={friend.username} className="flex items-center justify-between p-4">
                            <UserCard
                                {...{ name: friend.username, image: friend.image }}
                                className="mr-4 inline-flex"
                            />
                            <div className="flex items-center">
                                <span className="mr-4">Available</span>
                                <div className={`bg-green-500 rounded-full h-4 w-4 ${styles.indicator} inline-block`} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center px-4 py-16 w-full">
                        Looks like everyone&apos;s busy right now :(
                        <br />
                        Come back later to find someone to hang out with!
                    </p>
                )}
            </div>
        </>
    );
};

export default Secured(dashboard);
