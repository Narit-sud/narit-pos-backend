import * as jose from "jose";
export async function signToken(
    payload: any,
    secretKey: string
): Promise<string> {
    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(new TextEncoder().encode(secretKey));
    return jwt;
}

export async function verifyToken(token: string): Promise<boolean> {
    const secretKey = process.env.JWT_SECRET_KEY!;
    try {
        const { payload } = await jose.jwtVerify(
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
        const { payload } = await jose.jwtDecrypt(
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
