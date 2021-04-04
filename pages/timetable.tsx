import React from "react";

import Head from "../components/layout/Head";
import Title from "../components/Title";

export default function timetable(): JSX.Element {
    return (
        <>
            <Head title="Timetable" />
            <div className="p-4">
                <Title>Timetable</Title>
            </div>
        </>
    );
}
