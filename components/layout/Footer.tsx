import Link from "next/link";
import React from "react";

export default function Footer(): JSX.Element {
    return (
        <footer className="flex">
            <div>
                <h2>Legal</h2>
                <Link href="/privacy">Privacy</Link>
                <Link href="/tos">Terms of Service</Link>
            </div>
            <div>
                <h2>Legal</h2>
                <Link href="/privacy">Privacy</Link>
                <Link href="/tos">Terms of Service</Link>
            </div>
        </footer>
    );
}
