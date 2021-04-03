import NextHead from "next/head";

interface HeadProps {
    title: string;
}

export default function Head(props: HeadProps): JSX.Element {
    return (
        <NextHead>
            <title>Social Motion | {props.title}</title>
            {/* Favicon */}
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1186f1" />
            <meta name="msapplication-TileColor" content="#1186f1" />
            <meta name="theme-color" content="#ffffff" />
        </NextHead>
    );
}
