import Link from "next/link";
import React from "react";

import Button from "./Button";

export default function LoginButton(): JSX.Element {
    return (
        <Link href="api/auth/login">
            <Button variant="primary">Log in</Button>
        </Link>
    );
}
