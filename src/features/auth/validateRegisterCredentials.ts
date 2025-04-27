import { RegisterCredentialsInterface } from "./auth.interface";

export function validateRegisterCredentials(
    credentials: RegisterCredentialsInterface
): boolean {
    const { name, surname, email, phoneNumber, username, password } =
        credentials;
    if (!name || !surname || !email || !phoneNumber || !username || !password) {
        return false;
    }
    if (
        typeof name !== "string" ||
        typeof surname !== "string" ||
        typeof email !== "string" ||
        typeof phoneNumber !== "string" ||
        typeof username !== "string" ||
        typeof password !== "string"
    ) {
        return false;
    }
    return true;
}
