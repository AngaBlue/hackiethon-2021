import Link from "next/link";
import { useSession } from "next-auth/client";
import React from "react";

import Button from "./Button";

interface LoginButtonProps {
    force?: true;
}

export default function LoginButton({ force }: LoginButtonProps): JSX.Element {
    const [session] = useSession();
    if (!session || force)
        return (
            <Link href="/auth/login">
                <Button variant="primary">Log in</Button>
            </Link>
        );
    else
        return (
            <Link href="/dashboard">
                <Button variant="primary">Dashboard</Button>
            </Link>
        );
}
