import { Request, Response } from "express";
import { CustomError } from "../../class/CustomError";
import { db } from "../../libs/db";
import { registerService } from "./services";
import { validateRegisterCredentials } from "./validateRegisterCredentials";

export async function getAllHandle(req: Request, res: Response): Promise<void> {
    const sql = `select * from "user"`;
    try {
        const result = await db.query(sql);
        if (result.rowCount === 0) {
            throw new CustomError("No users found", 404);
        }
        console.log(result.rows);
        res.status(200).send({
            message: "Get all user success",
            data: result.rows,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function registerHandle(
    req: Request,
    res: Response,
): Promise<void> {
    const credentials = req.body;
    if (!credentials) {
        res.status(400).send({
            message: "Bad request",
            error: "Credentials are required",
        });
        return;
    }
    const credentialsValid = validateRegisterCredentials(credentials);
    if (!credentialsValid) {
        res.status(400).send({
            message: "Bad request",
            error: "Credentials are not valid",
        });
        return;
    }
    try {
        await registerService(credentials);
        res.status(201).send({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            if (error.message.includes("email")) {
                res.status(400).send({ message: "Email already exists" });
                return;
            }
            res.status(500).send({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}
