import dayjs, { ConfigType } from "dayjs";

export default function dateToString(date: ConfigType): string {
    return dayjs(date).format("dddd, D MMMM, h:mm a");
}
