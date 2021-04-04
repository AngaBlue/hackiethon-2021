import React, { useState } from "react";

import AsyncState from "../types/AsyncState";
import { CalendarEvents } from "../types/database";
import dateToString from "../util/dateToString";
import getHost from "../util/getHost";
import Button from "./Button";

interface EventEntryProps extends CalendarEvents {
    deleteEvent(id: CalendarEvents["id"]): void;
}

export default function EventEntry(props: EventEntryProps): JSX.Element {
    const [state, setState] = useState(AsyncState(null));

    async function deleteEntry() {
        if (state.loading) return;
        setState({ ...state, loading: true });
        const res = await fetch(`${getHost()}/api/calendar/deleteEvent?eventID=${props.id}`);
        if (res.ok) {
            props.deleteEvent(props.id);
        } else {
            setState((s) => ({ ...s, loading: false }));
        }
    }

    return (
        <div key={props.id} className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="bold">
                {dateToString(props.start_time)} - {dateToString(props.end_time)}
            </span>
            <Button variant="danger" onClick={deleteEntry} disabled={state.loading}>
                {state.loading ? "Loading..." : "Delete Entry"}
            </Button>
        </div>
    );
}
