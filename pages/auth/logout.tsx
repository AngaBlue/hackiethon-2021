import { signOut } from "next-auth/client";
import React from "react";

import Button from "../../components/Button";
import Head from "../../components/layout/Head";

export default function SignIn(): JSX.Element {
    // const [session] = useSession();
    return (
        <>
            <Head title="Log Out" />

            <div className="flex text-center flex-col justify-center content-center h-screen">
                <div>
                    <h1 className="font-bold text-4xl mb-4">Sign In</h1>
                    <p className="mb-8">
                        Sign into Social Motion on this device.
                        <br />
                        You can login again at any time using the login provider you signed up with.
                    </p>
                    <Button variant="primary" onClick={() => signOut()}>
                        Log Out
                    </Button>
                </div>
            </div>
        </>
    );
}
