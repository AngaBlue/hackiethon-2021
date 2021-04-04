import Link from "next/link";
import { useSession } from "next-auth/client";
import React from "react";

interface navItem {
    name: string;
    path: string;
    authenticated?: true;
}

const navItems: navItem[] = [
    {
        name: "Dashboard",
        path: "/dashboard"
    },
    {
        name: "Personal Timetable",
        path: "/timetable"
    },
    {
        name: "Friends",
        path: "/friends"
    },
    {
        name: "Events",
        path: "/events"
    },
    {
        name: "Settings",
        path: "/settings"
    },
    {
        name: "Log Out",
        path: "/auth/logout",
        authenticated: true
    }
];

export default function Nav(): JSX.Element {
    const [session] = useSession();

    return (
        <nav className="border-r border-gray-100">
            {navItems.map((item) => {
                if (item.authenticated && !session) return null;
                return (
                    <Link key={item.path} href={item.path}>
                        <div className="flex p-4 items-center w-ful hover:bg-blue-100 cursor-pointer transition-all duration-500 border-b border-gray-100">
                            <span className="font-bold block h-auto">{item.name}</span>
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
}
