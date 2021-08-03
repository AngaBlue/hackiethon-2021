import "next-auth";

declare module "next-auth" {
    interface User {
        id: number;
        name: string;
    }

    interface Session {
        accessToken: string;
    }
}
