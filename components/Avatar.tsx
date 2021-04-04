import React from "react";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    name: string;
    image: string;
}

export default function Avatar(props: AvatarProps): JSX.Element {
    return (
        <img
            {...props}
            className="h-10 w-10 rounded-full mr-2 inline-block"
            alt={`${props.name}'s Avatar`}
            src={props.image}
        />
    );
}
