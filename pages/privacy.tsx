import React from "react";

import Button from "../components/Button";
import Head from "../components/layout/Head";
import Title from "../components/Title";

export default function privacy(): JSX.Element {
    return (
        <>
            <Head title="Privacy Policy" />
            <div className="p-4">
                <Title>Privacy Policy</Title>
                <p className="mb-4">
                    We don&apos;t have a privacy policy yet but we can assure you we&apos;re not bad people.
                    <br />
                    xoxo
                </p>
                <Button variant="primary" onClick={() => alert("This is an Oli button, what'd you expect?")}>
                    Oli Button
                </Button>
            </div>
        </>
    );
}
