import { Dayjs } from "dayjs";

export type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;
export type UserInfoType = { username: string };
export type RecurringEvent = { id: string; startTime: Dayjs; endTime: Dayjs; dayOfWeek: number };
