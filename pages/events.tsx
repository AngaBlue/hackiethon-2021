import React from "react";

import Head from "../components/layout/Head";

export default function events(): JSX.Element {
    return (
        <>
            <Head title="Events" />
            <div className="flex text-center flex-col justify-center content-center h-screen">
                <div>
                    <h1 className="font-bold text-4xl mb-4">Events</h1>
                    <p className="mb-8">
                        The events feature is under construction. <br />
                        Come back later to see what we brew up!
                    </p>
                </div>
            </div>
        </>
    );
}
