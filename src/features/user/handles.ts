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
