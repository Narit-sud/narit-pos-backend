import { Request, Response } from "express";
import { loginService } from "./services";
import { validateLoginCredentials } from "./validateLoginCredentials";
import { CustomError } from "../../class/CustomError";
import { signToken } from "../../libs/token";

export async function loginHandle(req: Request, res: Response): Promise<void> {
    const credentials = req.body;
    if (!credentials) {
        res.status(400).json({
            success: false,
            message: "Bad request",
            error: "Credentials are required",
        });
        return;
    }
    const credentialsValid = validateLoginCredentials(
        credentials.username,
        credentials.password,
    );
    if (!credentialsValid.isValid) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: credentialsValid.message,
        });
        return;
    }
    try {
        const userId = await loginService(
            credentials.username,
            credentials.password,
        );
        //  add token to the response header
        const token = await signToken(
            { id: userId, username: credentials.username },
            process.env.JWT_SECRET_KEY!,
        );
        // response to client
        res.status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // min, sec, hours, mil sec = 1 day
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
            })
            .json({
                success: true,
                message: "Login successful",
            });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.code).json({
                success: false,
                message: error.message,
                error: error.error,
            });
            return;
        }
        console.error("Unexpected error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
