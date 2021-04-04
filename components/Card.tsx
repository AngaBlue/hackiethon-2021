import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
}

export default function Card({ title, ...props }: CardProps): JSX.Element {
    return (
        <div {...props} className="rounded bg-gray-200">
            {!!title && (
                <div className="bg-blue-600 p-4">
                    <h2 className="text-white text-2xl font-bold">{title}</h2>
                </div>
            )}
        </div>
    );
}