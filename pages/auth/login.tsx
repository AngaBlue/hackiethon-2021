import { getProviders, signIn } from "next-auth/client";

import Button from "../../components/Button";
import { PromiseResolvedType } from "../util/types";

interface SignInProps {
    providers: PromiseResolvedType<ReturnType<typeof getProviders>>;
}

export default function SignIn({ providers }: SignInProps): JSX.Element {
    return (
        <div>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <Button variant="primary" onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </Button>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps(): Promise<{ props: SignInProps }> {
    const providers = await getProviders();
    return {
        props: { providers }
    };
}
