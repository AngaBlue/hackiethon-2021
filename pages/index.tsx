import React from "react";

import Head from "../components/layout/Head";
import LoginButton from "../components/LoginButton";
import Title from "../components/Title";

export default function Home(): JSX.Element {
    return (
        <>
            <Head title="Home" />
            <div className="flex items-center justify-center p-8 flex-col w-full min-h-full text-center">
                <Title>Welcome to Social Motion</Title>
                <p className="mb-4">Please log in to get started!</p>
                <LoginButton />
            </div>
        </>
    );
}
