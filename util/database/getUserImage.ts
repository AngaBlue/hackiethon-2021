import { UserAuth } from "../../types/database";
import connection from "./connection";

export async function getUserImage(id: number): Promise<string> {
    const results: Array<Partial<UserAuth>> = await connection.query("SELECT image FROM users WHERE id = ?", [id]);

    await connection.end();

    if (results.length != 1) {
        // Should throw?
        return "";
    }

    return results[0].image;
}
