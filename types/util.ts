import dayjs from "dayjs";
import { CalendarEvents } from "../types/database";

export type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;
export type RecurringEvent = { id: string; startTime: dayjs.Dayjs; endTime: dayjs.Dayjs; dayOfWeek: number };

export class UserWithNestedEvents {
    user_id: number;
    username: string;
    image: string;
    events: CalendarEvents[];

    constructor (user_id: number, username: string, image: string) {
        this.user_id = user_id;
        this.username = username;
        this.image = image;
        this.events = new Array();
    }
}