import React from "react";

import Head from "../components/layout/Head";
import Title from "../components/Title";

export default function events(): JSX.Element {
    return (
        <>
            <Head title="Events" />
            <div className="flex text-center flex-col justify-center content-center h-screen">
                <div>
                    <Title>Events</Title>
                    <p className="mb-8">
                        The events feature is under construction. <br />
                        Come back later to see what we brew up!
                    </p>
                </div>
            </div>
        </>
    );
}
