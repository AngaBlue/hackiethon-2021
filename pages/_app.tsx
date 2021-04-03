import "../styles/globals.scss";

import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import React from "react";

import Footer from "../components/Footer";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider session={pageProps.session}>
            <Nav />
            <Component {...pageProps} />
            <Footer />
        </Provider>
    );
}

export default MyApp;
