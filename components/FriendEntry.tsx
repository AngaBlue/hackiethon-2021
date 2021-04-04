import React from "react";

import { Friend } from "../util/database/getUserFriends";
import Button from "./Button";

export default function FriendEntry(props: Friend): JSX.Element {
    return (
        <div key={props.id} className="flex justify-between p-4 border-b border-gray-100">
            <span className="text-bold">{props.username}</span>
            <Button variant="danger">Unfriend</Button>
        </div>
    );
}
