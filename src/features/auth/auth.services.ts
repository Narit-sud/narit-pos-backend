import { db } from "../../libs/db";
import { comparePassword } from "../../libs/encrypt";
import { CustomError } from "../../class/CustomError";
import { v4 as uuidv4 } from "uuid";
import { RegisterCredentialsInterface } from "./auth.interface";
import { hashPassword } from "../../libs/encrypt";

/**
 * @returns user id if the username and password are correct
 */
export async function loginService(
    username: string,
    password: string
): Promise<string> {
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

export async function registerService(
    credentials: RegisterCredentialsInterface
): Promise<void> {
    const sql = `
    INSERT INTO 
        "user"
        (id, "name", surname, username, "password", email, phone_number)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;
    const hashedPassword = hashPassword(credentials.password);
    credentials.password = hashedPassword;
    if (!credentials.id) credentials.id = uuidv4();
    try {
        const query = await db.query(sql, [
            credentials.id || uuidv4(),
            credentials.name,
            credentials.surname,
            credentials.username,
            credentials.password,
            credentials.email,
            credentials.phoneNumber,
        ]);
        if (query.rowCount === 0) {
            throw new Error("User not registered");
        }
        console.log("User registered successfully", query.rowCount);
    } catch (error) {
        throw error;
    }
}
