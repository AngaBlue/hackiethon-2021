import Link from "next/link";
import React from "react";

export default function Footer(): JSX.Element {
    const links = {
        Pages: {
            Dashboard: "/dashboard",
            "Friend Availability": "/friends",
            "Current Events": "/events",
            "User Settings": "/settings"
        },
        Legal: {
            Privacy: "/privacy",
            TOS: "/tos"
        }
    };
    return (
        <footer className="flex py-8 bg-blue-600 text-white">
            {Object.keys(links).map((section) => (
                <div className="px-8" key={section}>
                    <h2 className="font-bold">{section}</h2>
                    {Object.keys(links[section]).map((name) => (
                        <Link href={links[section][name]} key={name}>
                            <a className="block underline">{name}</a>
                        </Link>
                    ))}
                </div>
            ))}
        </footer>
    );
}
