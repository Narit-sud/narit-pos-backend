import { db } from "../../libs/db";
import { comparePassword } from "../../libs/encrypt";
import { CustomError } from "../../Class/CustomError";

type userId = string;

/**
 * @returns user id if the username and password are correct
 */
export async function loginService(
    username: string,
    password: string
): Promise<userId> {
    // return user id
    const sql = `SELECT password, id FROM "user" WHERE username = $1`;
    try {
        const query = await db.query(sql, [username]);
        if (query.rowCount === 0) {
            throw new CustomError("Invalid username or password", 401);
        }
        const hashedPassword = query.rows[0].password;
        const isPasswordMatched = comparePassword(password, hashedPassword);
        if (!isPasswordMatched) {
            throw new CustomError("Invalid username or password", 401);
        }
        return query.rows[0].id;
    } catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        console.error("Database error:", error);
        throw new CustomError("Internal server error", 500);
    }
}
