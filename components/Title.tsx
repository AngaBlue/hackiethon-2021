import { HTMLAttributes } from "react";

export default function Card(props: HTMLAttributes<HTMLHeadingElement>): JSX.Element {
    return (
        <h1 {...props} className={`font-bold text-4xl mb-4 ${props.className || ""}`}>
            {props.children}
        </h1>
    );
}
