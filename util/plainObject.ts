export default function plainObject<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}
