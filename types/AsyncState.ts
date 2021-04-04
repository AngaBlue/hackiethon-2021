export interface APIError {
    name: string;
    message: string;
}

export interface AsyncState<T> {
    loading: boolean;
    requested: null | Date;
    error: null | Error;
    data: T;
}

export default function AsyncState<T>(initial: T): AsyncState<T> {
    return {
        loading: false,
        requested: null,
        error: null,
        data: initial
    };
}
