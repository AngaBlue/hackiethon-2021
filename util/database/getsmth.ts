import { User } from "../../types/database";
import connection from "./connection";

export async function getIDByUsername(username: string): Promise<number> {
    const results: Array<Partial<User>> = await connection.query("SELECT id FROM int_users WHERE username = ?", [
        username
    ]);

    await connection.end();

    if (results.length != 1) {
        // Should throw?
        return -1;
    }

    return results[0].id;
}
