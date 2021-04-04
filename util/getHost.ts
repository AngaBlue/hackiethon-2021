export default function getHost(): string {
    return window ? window.location.protocol + "//" + window.location.host : process.env.NEXTAUTH_URL;
}
