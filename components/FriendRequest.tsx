import React, { useState } from "react";

import AsyncState from "../types/AsyncState";
import { Friend } from "../util/database/getUserFriends";
import getHost from "../util/getHost";
import Button from "./Button";

interface FriendEntryProps extends Friend {
    deleteRequest(id: Friend["id"], accept?: boolean): void;
}

export default function FriendEntry(props: FriendEntryProps): JSX.Element {
    const [state, setState] = useState(AsyncState(null));

    async function accept() {
        if (state.loading) return;
        setState({ ...state, loading: true });
        const res = await fetch(`${getHost()}/api/friend/confirmFriendRequest?friendID=${props.id}`);
        if (res.ok) {
            props.deleteRequest(props.id, true);
        } else {
            setState((s) => ({ ...s, loading: false }));
        }
    }

    async function deny() {
        if (state.loading) return;
        setState({ ...state, loading: true });
        const res = await fetch(`${getHost()}/api/friend/deleteFriendRequest?friendID=${props.id}`);
        if (res.ok) {
            props.deleteRequest(props.id);
        } else {
            setState((s) => ({ ...s, loading: false }));
        }
    }

    return (
        <div key={props.id} className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="bold">@{props.username}</span>
            <div>
                <Button variant="primary" onClick={accept} disabled={state.loading} className="mr-4">
                    {state.loading ? "Loading..." : "Accept"}
                </Button>
                <Button variant="danger" onClick={deny} disabled={state.loading}>
                    {state.loading ? "Loading..." : "Deny"}
                </Button>
            </div>
        </div>
    );
}
