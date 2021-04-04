export interface User {
    id: number;
    username: string;
    last_login: string;
}

export interface Session {
    id: number;
    user_id: number;
    expires: string;
    session_token: string;
    access_token: string;
    create_at: string;
    updated_at: string;
}

export interface UserRelationship {
    main: number;
    secondary: number;
}

export interface CalendarEvents {
    id: number;
    external_id: number;
    start_time: string;
    end_time: string;
    utc_offset: number;
}
