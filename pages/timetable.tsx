import "react-datetime/css/react-datetime.css";

import moment from "moment";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Datetime from "react-datetime";

import Button from "../components/Button";
import EventEntry from "../components/EventEntry";
import Head from "../components/layout/Head";
import Title from "../components/Title";
import AsyncState from "../types/AsyncState";
import { CalendarEvents } from "../types/database";
import { PromiseResolvedType } from "../types/util";
import { getUserEvents } from "../util/database/getUserEvents";
import getHost from "../util/getHost";
import plainObject from "../util/plainObject";

interface ServerSideProps {
    events: PromiseResolvedType<ReturnType<typeof getUserEvents>>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (ctx) => {
    const token = ctx.req.cookies["next-auth.session-token"] || ctx.req.cookies["__Secure-next-auth.session-token"];
    const [events] = await Promise.all([getUserEvents(token)]);
    return {
        props: {
            events: plainObject(events)
        }
    };
};

const initialEventState = { start: Date.now(), end: Date.now() };

export default function timetable({ events }: ServerSideProps): JSX.Element {
    const [state, setState] = useState(events);
    const [event, setEvent] = useState(AsyncState({ ...initialEventState }));

    function deleteEvent(id: CalendarEvents["id"]) {
        const index = state.findIndex((e) => e.id === id);
        if (index > -1) state.splice(index, 1);
        setState([...state]);
    }

    async function createEvent() {
        if (event.loading) return;
        setEvent((f) => ({ ...f, loading: true, error: null }));
        const times = [event.data.start, event.data.end].sort((a, b) => a - b);
        const res = await fetch(`${getHost()}/api/calendar/createEvent?startTime=${times[0]}&endTime=${times[1]}`);
        if (res.ok) {
            setEvent({ ...event, loading: false, data: { ...initialEventState }, error: null });
            const body = await res.json();
            setState([...state, body]);
        } else {
            setEvent({ ...event, loading: false, data: { ...initialEventState }, error: await res.json() });
        }
    }

    return (
        <>
            <Head title="Timetable" />
            <div className="p-4">
                <Title>Your Events</Title>
                {state.length > 0 ? (
                    <div className="mb-4">
                        {state.map((e) => (
                            <EventEntry key={e.id} {...e} deleteEvent={deleteEvent} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center px-4 py-16 w-full">
                        You have no events listed.
                        <br />
                        Why don&apos;t you go ahead and add a few below?
                    </p>
                )}
                <Title>Add an Event</Title>
                <h2 className="font-bold text-2xl mb-4">Start</h2>
                <Datetime
                    dateFormat="dddd, D MMMM"
                    timeFormat="h:mm a"
                    className="rounded border-gray-200 border-2 mb-4"
                    initialValue={moment(event.data.start)}
                    onChange={(date) =>
                        setEvent({
                            ...event,
                            data: {
                                ...event.data,
                                start: typeof date === "string" ? moment(date).valueOf() : date.valueOf()
                            }
                        })
                    }
                    inputProps={{ disabled: event.loading, className: "h-full w-full p-2" }}
                />
                <h2 className="font-bold text-2xl mb-4">End</h2>
                <Datetime
                    dateFormat="dddd, D MMMM"
                    timeFormat="h:mm a"
                    className="rounded border-gray-200 border-2 mb-4"
                    initialValue={moment(event.data.start)}
                    onChange={(date) =>
                        setEvent({
                            ...event,
                            data: {
                                ...event.data,
                                end: typeof date === "string" ? moment(date).valueOf() : date.valueOf()
                            }
                        })
                    }
                    inputProps={{ disabled: event.loading, className: "h-full w-full p-2" }}
                />
                <Button variant="primary" onClick={createEvent} disabled={event.loading} className="inline-block">
                    {event.loading ? "Loading..." : "Create Event"}
                </Button>
            </div>
        </>
    );
}
