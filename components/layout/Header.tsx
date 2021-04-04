import Link from "next/link";
import { useSession } from "next-auth/client";
import React from "react";

import LoginButton from "../LoginButton";
import UserCard from "../UserCard";

export default function Header(): JSX.Element {
    const [session] = useSession();
    return (
        <header className="flex justify-between px-4 py-2 content-center border-b border-blue-100">
            <Link href="/">
                <img src="/logo-banner.svg" alt="Logo Banner" className="cursor-pointer" />
            </Link>
            {session ? <UserCard name={session.user.name} image={session.user.image} /> : <LoginButton />}
        </header>
    );
}
