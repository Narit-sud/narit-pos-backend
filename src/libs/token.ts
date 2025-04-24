import { SignJWT, jwtDecrypt, jwtVerify } from "jose";
import {} from "jose";

export function signToken(payload: any, secretKey: string): Promise<string> {
    const jwt = new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(new TextEncoder().encode(secretKey));
    return jwt;
}

export async function verifyToken(token: string): Promise<boolean> {
    const secretKey = process.env.JWT_SECRET_KEY!;
    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(secretKey)
        );
        if (payload) {
            return true;
        }
    } catch (error) {
        console.error("Token verification error:", error);
        return false;
    }
    return false;
}

export async function decryptToken(token: string): Promise<string | null> {
    const secretKey = process.env.JWT_SECRET_KEY!;
    try {
        const { payload } = await jwtDecrypt(
            token,
            new TextEncoder().encode(secretKey)
        );
        if (payload) {
            return payload.userId as string;
        }
    } catch (error) {
        console.error("Token decryption error:", error);
        return null;
    }
    return null;
}
