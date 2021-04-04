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
    confirmed: boolean;
}

export interface CalendarEvents {
    id: number;
    external_id: number;
    start_time: string;
    end_time: string;
    utc_offset: number;
}

export interface CalendarEventsWithUserInfo {
    id: number;
    external_id: number;
    start_time: string;
    end_time: string;
    utc_offset: number;
    user_id: number;
    username: string;
    image: string;
}

export interface UserAuth {
    id: number;
    name: string;
    email: string;
    email_verified: boolean;
    image: string;
    create_at: string;
    updated_at: string;
    linked_accounts: Array<Account>;
}

export interface Account {
    id: number;
    compound_id: number;
    user_id: number;
    provider_type: string;
    provider_id: string;
    provider_account_id: string;
    refresh_token: string;
    access_token: string;
    access_token_expired: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserInfo {
    username: string;
}
