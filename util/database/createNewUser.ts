import connection from "./connection";

export async function createNewUser(id: number, username: string): Promise<void> {
    await connection.query("INSERT INTO int_users (id, username, last_login) VALUES (?, ?, NOW());", [id, username]);

    await connection.end();

    return;
}
