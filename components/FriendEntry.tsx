import React, { useState } from "react";

import AsyncState from "../types/AsyncState";
import { Friend } from "../util/database/getUserFriends";
import getHost from "../util/getHost";
import Button from "./Button";

interface FriendEntryProps extends Friend {
    deleteFriend(id: Friend["id"]): void;
}

export default function FriendEntry(props: FriendEntryProps): JSX.Element {
    const [state, setState] = useState(AsyncState(null));

    async function unfriend() {
        if (state.loading) return;
        setState({ ...state, loading: true });
        const res = await fetch(`${getHost()}/api/friend/deleteFriendRequest?friendID=${props.id}`);
        if (res.ok) {
            props.deleteFriend(props.id);
        } else {
            setState((s) => ({ ...s, loading: false }));
        }
    }

    return (
        <div key={props.id} className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="bold">@{props.username}</span>
            <Button variant="danger" onClick={unfriend} disabled={state.loading}>
                {state.loading ? "Loading..." : "Unfriend"}
            </Button>
        </div>
    );
}
