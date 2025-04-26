import { Response } from "express";
import { CustomError } from "../class/CustomError";
import { ApiResponse } from "../class/ApiResponse";

export function serviceErrorHandle(res: Response, error: unknown): void {
    if (error instanceof CustomError) {
        if (error instanceof CustomError) {
            res.status(error.code).send(new ApiResponse(false, error.message));
            return;
        } else {
            console.log(error);
            res.status(500).send(
                new ApiResponse(false, "Unexpected Error", error),
            );
            return;
        }
    }
}
