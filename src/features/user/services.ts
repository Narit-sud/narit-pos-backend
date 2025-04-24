import { RegisterCredentialsInterface } from "./interface";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../libs/db";
import { hashPassword } from "../../libs/encrypt";

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
        console.log(error);
        throw error;
    }
}
