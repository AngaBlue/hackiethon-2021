import React from "react";

import Head from "./layout/Head";
import LoginButton from "./LoginButton";

export default function Unauthenticated(): JSX.Element {
    return (
        <>
            <Head title="Unauthenticated" />

            <div className="flex text-center flex-col justify-center content-center h-screen">
                <div>
                    <h1 className="font-bold text-4xl mb-4">Unauthenticated</h1>
                    <p className="mb-8">In order to access this page you&apos;ll need to login.</p>
                    <LoginButton />
                </div>
            </div>
        </>
    );
}
