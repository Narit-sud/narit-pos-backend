/**
 * Validates user login credentials based on username and password requirements
 *
 * @param username - The username to validate
 * @param password - The password to validate
 *
 * @returns An object containing:
 * - isValid: boolean indicating if credentials are valid
 * - message?: optional error message if validation fails
 *
 * @example
 * ```typescript
 * const result = validateLoginCredentials('user123', 'password123');
 * if (!result.isValid) {
 *   console.log(result.message); // Prints error message if validation failed
 * }
 * ```
 */
export function validateLoginCredentials(
    username: string,
    password: string
): { isValid: boolean; message?: string } {
    if (!username && !password) {
        return {
            isValid: false,
            message: "Username and password are required",
        };
    }

    if (!username) {
        return {
            isValid: false,
            message: "Username is required",
        };
    }

    if (!password) {
        return {
            isValid: false,
            message: "Password is required",
        };
    }

    if (username.length < 3) {
        return {
            isValid: false,
            message: "Username must be at least 3 characters",
        };
    }

    if (password.length < 6) {
        return {
            isValid: false,
            message: "Password must be at least 6 characters",
        };
    }

    return { isValid: true };
}
