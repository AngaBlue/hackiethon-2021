import { useSession } from "next-auth/client";

import Unauthenticated from "./Unauthenticated";

// interface SecuredProps {}

export function Secured<T /* extends SecuredProps = SecuredProps*/>(
    WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const SecuredPage = (props: T /* Omit<T, keyof SecuredProps> */) => {
        const [session] = useSession();
        if (session && session.user) {
            return <WrappedComponent {...(props as T)} />;
        } else {
            return <Unauthenticated />;
        }
    };

    SecuredPage.displayName = displayName;

    return SecuredPage;
}
