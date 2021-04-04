import React from "react";

import Head from "../components/layout/Head";
import Title from "../components/Title";

export default function tos(): JSX.Element {
    return (
        <>
            <Head title="Terms of Service" />

            <div className="p-4">
                <Title>Terms of Service</Title>
                <p>
                    We don&apos;t have a terms of service yet we hope that you&apos;ll be a nice person.
                    <br />
                    Thanks!
                </p>
            </div>
        </>
    );
}
