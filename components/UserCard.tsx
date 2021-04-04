import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    image: string;
}

export default function Card({ name, image, ...props }: CardProps): JSX.Element {
    return (
        <div {...props} className={`flex items-center ${props.className || ""}`}>
            <img className="h-10 w-10 rounded-full mr-2 inline-block" alt={`${name}'s Avatar`} src={image} />
            <span className="font-bold whitespace-nowrap">@{name}</span>
        </div>
    );
}
