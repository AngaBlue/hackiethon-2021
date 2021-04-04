import { GetServerSideProps } from "next";
import React from "react";

import EventEntry from "../components/EventEntry";
import Head from "../components/layout/Head";
import Title from "../components/Title";
import { PromiseResolvedType } from "../types/util";
import { getUserEvents } from "../util/database/getUserEvents";
import plainObject from "../util/plainObject";

interface ServerSideProps {
    events: PromiseResolvedType<ReturnType<typeof getUserEvents>>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (ctx) => {
    const token = ctx.req.cookies["next-auth.session-token"];
    const [events] = await Promise.all([getUserEvents(token)]);
    return {
        props: {
            events: plainObject(events)
        }
    };
};

export default function timetable({ events }): JSX.Element {
    return (
        <>
            <Head title="Timetable" />
            <div className="p-4">
                <Title>Your Events</Title>
                {events.length > 1 ? (
                    <div>
                        {events.map((e) => (
                            <EventEntry key={e.id} {...e} />
                        ))}
                    </div>
                ) : (
                    <p className="p-4 text-center">
                        You have no events listed.
                        <br />
                        Why don&apos;t you go ahead and add a few below?
                    </p>
                )}
            </div>
        </>
    );
}
