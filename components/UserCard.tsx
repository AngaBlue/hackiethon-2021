import { HTMLAttributes } from "react";

import Avatar from "./Avatar";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    image: string;
}

export default function Card({ name, image, ...props }: CardProps): JSX.Element {
    return (
        <div {...props} className={`flex items-center ${props.className || ""}`}>
            <Avatar {...{ name, image }} />
            <span className="font-bold whitespace-nowrap">@{name}</span>
        </div>
    );
}
