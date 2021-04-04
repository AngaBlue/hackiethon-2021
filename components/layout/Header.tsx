import Link from "next/link";

import LoginButton from "../LoginButton";

export default function Header(): JSX.Element {
    return (
        <header className="flex justify-between px-4 py-2 content-center border-b border-blue-100">
            <Link href="/">
                <img src="/logo-banner.svg" alt="Logo Banner" className="cursor-pointer" />
            </Link>
            <LoginButton />
        </header>
    );
}
