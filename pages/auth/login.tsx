import { getProviders, signIn } from "next-auth/client";
import React from "react";

import Button from "../../components/Button";
import Head from "../../components/layout/Head";
import { PromiseResolvedType } from "../../util/types";

interface SignInProps {
    providers: PromiseResolvedType<ReturnType<typeof getProviders>>;
}

export default function SignIn({ providers }: SignInProps): JSX.Element {
    return (
        <>
            <Head title="Log In" />

            <div className="flex text-center flex-col justify-center content-center h-screen">
                <div>
                    <h1 className="font-bold text-4xl mb-4">Sign In</h1>
                    <p className="mb-8">
                        Sign into Social Motion with one of our secure authorisation providers.
                        <br />
                        Your password will not be shared with Social Motion.
                    </p>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <Button variant="primary" onClick={() => signIn(provider.id)} className="w-64 mb-4">
                                Log in with {provider.name}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(): Promise<{ props: SignInProps }> {
    const providers = await getProviders();
    return {
        props: { providers }
    };
}
