import { UserInterface } from "../features/user/interface";
import { CustomError } from "../Class/CustomError";

export function validateRegister(newUser: UserInterface) {
    if (!newUser) {
        throw new CustomError("Invalid credentials", 400);
    }
    if (!newUser.email || !newUser.password) {
        throw new CustomError("Invalid credentials", 400);
    }
    if (newUser.password.length < 6) {
        throw new CustomError("Password must be at least 6 characters", 400);
    }
    if (newUser.password.length > 20) {
        throw new CustomError("Password must be at most 20 characters", 400);
    }
    if (newUser.email.length < 6) {
        throw new CustomError("Email must be at least 6 characters", 400);
    }
    if (newUser.email.length > 50) {
        throw new CustomError("Email must be at most 50 characters", 400);
    }
    if (!newUser.email.includes("@")) {
        throw new CustomError("Email must be valid", 400);
    }
    if (!newUser.email.includes(".")) {
        throw new CustomError("Email must be valid", 400);
    }
    if (newUser.email.includes(" ")) {
        throw new CustomError("Email must be valid", 400);
    }
    if (newUser.password.includes(" ")) {
        throw new CustomError("Password must be valid", 400);
    }
}
