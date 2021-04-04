import React from "react";

import Head from "../components/layout/Head";
import { Secured } from "../components/Secured";
import Title from "../components/Title";

const friends = function (): JSX.Element {
    return (
        <>
            <Head title="Friends" />
            <div className="p-4">
                <Title>Friends</Title>
            </div>
        </>
    );
};

export default Secured(friends);
