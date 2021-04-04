import { User } from "../../types/database";
import connection from "./connection";

export async function getUsernameByID(id: number): Promise<string> {
    const results: Array<Partial<User>> = await connection.query("SELECT username FROM int_users WHERE id = ?", [id]);

    await connection.end();

    if (results.length != 1) {
        // Should throw?
        return "";
    }

    return results[0].username;
}
