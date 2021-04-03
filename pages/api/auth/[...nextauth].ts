import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { createNewUser } from "../../../util/databaseRoutes";

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        Providers.Twitter({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET
        }),
        Providers.Discord({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET
        }),
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    database: {
        type: "mysql",
        host: process.env.DATABASE_URL,
        port: 3306,
        username: process.env.DATABASE_ID,
        password: process.env.DATABASE_SECRET,
        database: process.env.DATABASE_NAME
    },
    pages: {
        signIn: "/auth/signin"
    },
    events: {
        async createUser(message) {
            createNewUser(message.User.id, message.User.name + message.User.id);
        }
    }
});
