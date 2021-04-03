import Image from "next/image";
import Link from "next/link";

import LoginButton from "../LoginButton";

export default function Header(): JSX.Element {
    return (
        <header className="flex justify-between px-4 py-2 content-center border-b border-gray-100">
            <Link href="/">
                <Image src="/banner.png" height={36} width={150} />
            </Link>
            <LoginButton />
        </header>
    );
}
