import Link from "next/link";
import { useSession } from "next-auth/client";
import React from "react";

import Avatar from "../Avatar";
import LoginButton from "../LoginButton";

export default function Header(): JSX.Element {
    const [session] = useSession();
    return (
        <header className="flex justify-between px-4 py-2 content-center border-b border-gray-100">
            <Link href="/">
                <img src="/logo-banner.svg" alt="Logo Banner" className="cursor-pointer" />
            </Link>
            {session ? <Avatar name={session.user.name} image={session.user.image} /> : <LoginButton />}
        </header>
    );
}
