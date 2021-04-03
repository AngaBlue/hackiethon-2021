import "../styles/globals.scss";

import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import React from "react";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import styles from "../styles/_app.module.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider session={pageProps.session}>
            <main className={styles.main}>
                <Header />
                <Nav />
                <div className={styles.content}>
                    <div className={styles.page}>
                        <Component {...pageProps} />
                    </div>
                    <Footer />
                </div>
            </main>
        </Provider>
    );
}

export default MyApp;
