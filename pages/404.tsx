import Link from "next/link";
import React from "react";

import Head from "../components/layout/Head";

export default function Custom404(): JSX.Element {
    return (
        <>
            <Head title="Page Not Found" />
            <div className="flex content-center justify-center p-8 flex-col w-full min-h-full text-center">
                <h1 className="font-bold text-3xl mb-8">404 Page Not Found</h1>
                <p>
                    Unfortunately this link is broken, would you like to head back to the{" "}
                    <Link href="/">
                        <a className="underline">home page</a>
                    </Link>
                    ?
                </p>
            </div>
        </>
    );
}