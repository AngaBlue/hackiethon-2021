import NextHead from "next/head";

interface HeadProps {
    title: string;
    description?: string;
}

export default function Head(props: HeadProps): JSX.Element {
    const title = `Social Motion | ${props.title}`;
    const description = props.description || "Social Motion.  See when your friends are around to hang out!";
    return (
        <NextHead>
            <title>{title}</title>
            {/* Favicon */}
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1186f1" />
            <meta name="msapplication-TileColor" content="#1186f1" />
            <meta name="theme-color" content="#ffffff" />
            {/* Meta Tags */}
            {/* <!-- Primary Meta Tags --> */}
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://hodgebodge.vercel.app" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://hodgebodge.vercel.app/logo-banner.png" />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://hodgebodge.vercel.app" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content="https://hodgebodge.vercel.app/logo-banner.png" />
        </NextHead>
    );
}
