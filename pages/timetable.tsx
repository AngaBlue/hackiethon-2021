import { GetServerSideProps } from "next";
import React, { useState } from "react";

import EventEntry from "../components/EventEntry";
import Head from "../components/layout/Head";
import Title from "../components/Title";
import { CalendarEvents } from "../types/database";
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

export default function timetable({ events }: ServerSideProps): JSX.Element {
    const [state, setState] = useState(events);

    function deleteEvent(id: CalendarEvents["id"]) {
        const index = state.findIndex((e) => e.id === id);
        if (index > -1) state.splice(index, 1);
        setState([...state]);
    }

    return (
        <>
            <Head title="Timetable" />
            <div className="p-4">
                <Title>Your Events</Title>
                {state.length > 1 ? (
                    <div>
                        {state.map((e) => (
                            <EventEntry key={e.id} {...e} deleteEvent={deleteEvent} />
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
