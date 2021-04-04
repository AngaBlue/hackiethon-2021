import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";

import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import Title from "../components/Title";
import UserCard from "../components/UserCard";
import styles from "../styles/pages/dashboard.module.scss";
import { PromiseResolvedType } from "../types/util";
import { getAvailableFriends } from "../util/database/getAvailableFriends";
import { getUserProfile } from "../util/database/getUserProfile";
import plainObject from "../util/plainObject";

interface ServerSideProps {
    availableFriends: PromiseResolvedType<ReturnType<typeof getAvailableFriends>>;
    profile: PromiseResolvedType<ReturnType<typeof getUserProfile>>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (ctx) => {
    const token = ctx.req.cookies["next-auth.session-token"] || ctx.req.cookies["__Secure-next-auth.session-token"];
    const [availableFriends, profile] = await Promise.all([getAvailableFriends(token), getUserProfile(token)]);
    return {
        props: {
            availableFriends: plainObject(availableFriends),
            profile: plainObject(profile)
        }
    };
};

const dashboard = function ({
    availableFriends,
    profile
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
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
                <Title>My Profile</Title>
                <UserCard className="mb-4" image={profile.image} name={profile.username} />
                <p>
                    Share this profile name with friends so they can add you on the{" "}
                    <Link href="/friends">
                        <a className="underline">friends page</a>
                    </Link>
                    !
                    <br />
                    You can also change your username at anytime in your{" "}
                    <Link href="/settings">
                        <a className="underline">settings</a>
                    </Link>
                    .
                </p>
            </div>
        </>
    );
};

export default Secured(dashboard);
